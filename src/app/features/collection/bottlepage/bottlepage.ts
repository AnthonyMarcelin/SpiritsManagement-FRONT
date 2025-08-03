import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { ImageKitService } from '../../../core/services/bottle/imagekit.service';
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
  showImageModal = false;
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
    private imageKitService: ImageKitService,
  ) {}

  goToCollection(): void {
    this.router.navigate([`/collection/${this.bottleType}`]);
  }

  // Méthode pour traduire les noms des champs en français
  getFieldTranslation(fieldName: string): string {
    const translations: { [key: string]: string } = {
      name: 'nom',
      review: 'avis',
      price: 'prix',
      origin: 'origine',
      peatLevel: 'niveau de tourbe',
      supplier: "lieu d'achat",
      description: 'description',
      note: 'note',
      photo: 'photo',
      type: 'type',
      label: 'étiquette',
    };

    return translations[fieldName] || fieldName;
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
    value: string | { id: number } | File;
  }) {
    try {
      if (payload.field === 'photo' && payload.value instanceof File) {
        const file = payload.value as File;
        const img = new Image();
        const reader = new FileReader();
        const resizedFile: File = await new Promise((resolve, reject) => {
          reader.onload = (e: any) => {
            img.src = e.target.result;
            img.onload = () => {
              const MAX_WIDTH = 1200;
              const MAX_HEIGHT = 1200;
              let width = img.width;
              let height = img.height;
              if (width > MAX_WIDTH || height > MAX_HEIGHT) {
                if (width > height) {
                  height = Math.round((height * MAX_WIDTH) / width);
                  width = MAX_WIDTH;
                } else {
                  width = Math.round((width * MAX_HEIGHT) / height);
                  height = MAX_HEIGHT;
                }
              }
              const canvas = document.createElement('canvas');
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              ctx?.drawImage(img, 0, 0, width, height);
              canvas.toBlob(
                (blob) => {
                  if (blob) {
                    resolve(
                      new File([blob], file.name, { type: 'image/jpeg' }),
                    );
                  } else {
                    resolve(file);
                  }
                },
                'image/jpeg',
                0.85,
              );
            };
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const authData: any = await firstValueFrom(
          this.imageKitService.getAuthData(),
        );

        const imagekit = new (await import('imagekit-javascript')).default({
          publicKey: (await import('../../../../environments/environment'))
            .environment.imagekitPublicKey,
          urlEndpoint: (await import('../../../../environments/environment'))
            .environment.imagekitUrlEndpoint,
        });

        const imagekitUrl: string = await new Promise((resolve, reject) => {
          imagekit.upload(
            {
              file: resizedFile,
              fileName: resizedFile.name,
              signature: authData.signature,
              token: authData.token,
              expire: authData.expire,
            },
            (err: any, result: any) => {
              if (err) reject(err);
              else resolve(result.url);
            },
          );
        });

        if (!imagekitUrl) throw new Error('Upload ImageKit échoué');

        const body = { photo: imagekitUrl };

        await firstValueFrom(
          this.api.put(`${this.bottleType}/${this.bottleId}`, body),
        );

        const response = await firstValueFrom(
          this.api.get(`${this.bottleType}/${this.bottleId}`),
        );

        const bottleData = response as { photo?: string };

        this.bottle = bottleData;
        this.showEditModal = false;
        this.showBottleToast('Photo modifiée avec succès', true);
        return;
      }

      const body: Record<string, string | number> = {};

      if (payload.field === 'peatLevel') {
        body['peatLevelId'] =
          typeof payload.value === 'object'
            ? (payload.value as any).id
            : payload.value;
      } else if (payload.field === 'label') {
        body['labelId'] =
          typeof payload.value === 'object'
            ? (payload.value as any).id
            : payload.value;
      } else if (payload.field === 'type') {
        body['typeId'] =
          typeof payload.value === 'object'
            ? (payload.value as any).id
            : payload.value;
      } else {
        body[payload.field] =
          typeof payload.value === 'object'
            ? (payload.value as any).id
            : payload.value;
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

  openImageModal() {
    this.showImageModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeImageModal() {
    this.showImageModal = false;
    document.body.style.overflow = 'auto';
  }
}
