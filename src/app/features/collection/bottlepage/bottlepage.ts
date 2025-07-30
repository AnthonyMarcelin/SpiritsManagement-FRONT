import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { LabelService } from '../../../core/services/bottle/label.service';
import { PeatLevelService } from '../../../core/services/bottle/peatLevel.service';
import { TypeService } from '../../../core/services/bottle/type.service';
import { Deletemodal } from '../../../shared/components/deletemodal/deletemodal';
import { Editmodal } from '../../../shared/components/editmodal/editmodal';

@Component({
  selector: 'app-bottlepage',
  imports: [
    CommonModule,
    FormsModule,
    NgClass,
    DatePipe,
    Editmodal,
    Deletemodal,
  ],
  templateUrl: './bottlepage.html',
  styleUrl: './bottlepage.scss',
})
export class Bottlepage implements OnInit {
  bottle: any = {};
  bottleType: string = 'whisky';
  bottleId: string = '';
  editField: string = 'name';

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.bottleType = params['alcool'] || 'whisky';
      this.bottleId = params['id'] || '';
      if (!this.bottleId) {
        this.showBottleToast('Aucune bouteille sélectionnée.', false);
        return;
      }
      try {
        const response = await firstValueFrom(
          this.api.get(`${this.bottleType}/${this.bottleId}`),
        );
        console.log('Réponse API bouteille:', response);
        this.bottle = response;
      } catch (error) {
        this.showBottleToast(
          'Erreur lors de la récupération des informations de la bouteille.',
          false,
        );
      }
    });
  }
  showToast = false;
  toastMessage = '';
  toastSuccess = true;
  showDeleteModal = false;
  toastTimeout: any;
  showEditModal = false;
  labelOptions: any[] = [];
  typeOptions: any[] = [];
  peatLevelOptions: any[] = [];

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private labelService: LabelService,
    private typeService: TypeService,
    private peatLevelService: PeatLevelService,
  ) {}

  goToCollection(): void {
    this.router.navigate([`/collection/${this.bottleType}`]);
  }

  async openEditModal(field: string = 'name') {
    this.editField = field;
    if (field === 'label') {
      await this.fetchLabelOptions();
    }
    if (field === 'type') {
      await this.fetchTypeOptions();
    }
    if (field === 'peatLevel' && this.bottleType === 'whisky') {
      await this.fetchPeatLevelOptions();
    }
    this.showEditModal = true;
  }

  async onDeleteConfirm() {
    try {
      await firstValueFrom(
        this.api.delete(`${this.bottleType}/${this.bottleId}`),
      );
      this.showDeleteModal = false;
      this.showBottleToast('Bouteille supprimée avec succès', true);
      this.goToCollection();
    } catch (error) {
      this.showBottleToast('Erreur lors de la suppression', false);
      this.showDeleteModal = false;
    }
  }

  onDeleteCancel() {
    this.showDeleteModal = false;
  }

  async fetchLabelOptions() {
    try {
      this.labelOptions = await firstValueFrom(this.labelService.getAllLabel());
    } catch (e) {
      this.labelOptions = [];
    }
  }
  async fetchTypeOptions() {
    try {
      this.typeOptions = await firstValueFrom(this.typeService.getAllType());
    } catch (e) {
      this.typeOptions = [];
    }
  }
  async fetchPeatLevelOptions() {
    try {
      this.peatLevelOptions = await firstValueFrom(
        this.peatLevelService.getAllPeatLevel(),
      );
    } catch (e) {
      this.peatLevelOptions = [];
    }
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  async onEditField(payload: {
    field: string;
    value: string | { id: number };
  }) {
    try {
      // Correction du mapping des champs pour l'API sans utiliser 'any' et avec accès indexé
      const body: Record<string, string | number> = {};
      if (payload.field === 'peatLevel') {
        body['peatLevelId'] =
          typeof payload.value === 'object' ? payload.value.id : payload.value;
      } else if (payload.field === 'label') {
        body['labelId'] =
          typeof payload.value === 'object' ? payload.value.id : payload.value;
      } else if (payload.field === 'type') {
        body['typeId'] =
          typeof payload.value === 'object' ? payload.value.id : payload.value;
      } else {
        body[payload.field] =
          typeof payload.value === 'object' ? payload.value.id : payload.value;
      }
      await firstValueFrom(
        this.api.put(`${this.bottleType}/${this.bottleId}`, body),
      );
      const response = await firstValueFrom(
        this.api.get(`${this.bottleType}/${this.bottleId}`),
      );
      this.bottle = response;
      this.showEditModal = false;
      this.showBottleToast('Modification enregistrée avec succès', true);
    } catch (error) {
      this.showBottleToast('Erreur lors de la modification', false);
    }
  }

  showBottleToast(message: string, success: boolean) {
    this.toastMessage = message;
    this.toastSuccess = success;
    this.showToast = true;
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.toastTimeout = setTimeout(() => {
      this.showToast = false;
    }, 3500);
  }
}
