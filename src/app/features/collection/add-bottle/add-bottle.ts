import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { LabelService } from '../../../core/services/bottle/label.service';
import {
  Origin,
  OriginService,
} from '../../../core/services/bottle/origin.service';
import { PeatLevelService } from '../../../core/services/bottle/peatLevel.service';
import {
  Supplier,
  SupplierService,
} from '../../../core/services/bottle/supplier.service';
import { TypeService } from '../../../core/services/bottle/type.service';
import { BeerService } from '../../../core/services/collection/beer.service';
import { RhumService } from '../../../core/services/collection/rhum.service';
import { WhiskyService } from '../../../core/services/collection/whisky.service';
import { Label } from '../../../models/label.interface';
import { PeatLevel } from '../../../models/peatLevel.interface';
import { Type } from '../../../models/type.interface';

interface Bottle {
  name: string;
  description?: string;
  review?: string;
  note?: number | null;
  price?: number | null;
  photo?: string | null;
  labelId?: number | null;
  originId?: string | null;
  supplierId?: string | null;
  typeId?: number | null;
  peatLevelId?: number | null;
  userId?: number | null;
  volume?: number | null;
  degree?: number | null;
  year?: number | null;
}

@Component({
  selector: 'app-add-bottle',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-bottle.html',
  styleUrls: ['./add-bottle.scss'],
})
export class AddBottle implements OnInit {
  onCancel() {
    if (this.alcoolType) {
      window.location.href = `/collection/${this.alcoolType}`;
    } else {
      window.location.href = '/collection';
    }
  }
  showErrorToast: boolean = false;
  errorToastMessage: string = '';
  labels: Label[] = [];
  types: Type[] = [];
  peatLevels: PeatLevel[] = [];
  origins: Origin[] = [];
  suppliers: Supplier[] = [];
  originSuggestions: Origin[] = [];
  supplierSuggestions: Supplier[] = [];

  constructor(
    private route: ActivatedRoute,
    private typeService: TypeService,
    private labelService: LabelService,
    private peatLevelService: PeatLevelService,
    private whiskyService: WhiskyService,
    private rhumService: RhumService,
    private beerService: BeerService,
    private originService: OriginService,
    private supplierService: SupplierService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.route.url.subscribe((segments) => {
      const typeSegment = segments.find((seg) =>
        ['whisky', 'rhum', 'beer'].includes(seg.path),
      );
      if (typeSegment) {
        this.alcoolType = typeSegment.path as 'whisky' | 'rhum' | 'beer';
        this.typeService
          .getTypesByAlcool(this.alcoolType)
          .subscribe((types: Type[]) => {
            this.types = types;
          });
      }
      this.labelService.getAllLabel().subscribe((labels: Label[]) => {
        this.labels = labels;
      });
      this.peatLevelService
        .getAllPeatLevel()
        .subscribe((peatLevels: PeatLevel[]) => {
          this.peatLevels = peatLevels;
        });
      this.originService.getAllOrigins().subscribe((origins: Origin[]) => {
        this.origins = origins;
      });
      this.supplierService
        .getAllSuppliers()
        .subscribe((suppliers: Supplier[]) => {
          this.suppliers = suppliers;
        });
    });
  }
  alcoolType?: 'whisky' | 'rhum' | 'beer';

  bottle: Bottle = {
    name: '',
    description: '',
    review: '',
    note: null,
    price: null,
    photo: '',
    labelId: null,
    originId: '',
    supplierId: '',
    typeId: null,
    peatLevelId: null,
    userId: null,
    volume: null,
    degree: null,
    year: null,
  };

  selectedPhoto?: File;
  photoPreviewUrl?: string;

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedPhoto = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photoPreviewUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedPhoto);
    } else {
      this.photoPreviewUrl = undefined;
    }
  }
  onOriginInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement)?.value || '';
    this.originSuggestions = this.origins.filter(
      (o) =>
        o &&
        o.country &&
        o.country.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }
  selectOrigin(country: string) {
    this.bottle.originId = country;
    this.originSuggestions = [];
  }

  onSupplierInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement)?.value || '';
    this.supplierSuggestions = this.suppliers.filter((s) =>
      s.name.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }
  selectSupplier(name: string) {
    this.bottle.supplierId = name;
    this.supplierSuggestions = [];
  }

  get filteredTypes() {
    return this.types;
  }

  isWhiskyType(typeId: number) {
    return this.types.some((t: any) => t.id === typeId && t.for_whisky);
  }
  isRhumType(typeId: number) {
    return this.types.some((t: any) => t.id === typeId && t.for_rhum);
  }
  isBeerType(typeId: number) {
    return this.types.some((t: any) => t.id === typeId && t.for_beer);
  }

  get showPeatLevel() {
    return this.alcoolType === 'whisky';
  }

  onAddBottle() {
    this.authService.getMe().subscribe({
      next: (user: any) => {
        this.bottle.userId = user?.id;
        console.log('[AddBottle] Soumission du formulaire', this.bottle);
        const formData = new FormData();
        Object.entries(this.bottle).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            formData.append(key, value as string);
          }
        });
        if (this.selectedPhoto) {
          formData.append('photo', this.selectedPhoto);
          console.log('[AddBottle] Photo sélectionnée', this.selectedPhoto);
        }
        for (const pair of (formData as any).entries()) {
          console.log(`[AddBottle] FormData: ${pair[0]} =`, pair[1]);
        }
        let addBottleObservable;
        if (this.alcoolType === 'whisky') {
          console.log('[AddBottle] Appel API: createWhisky');
          addBottleObservable = this.whiskyService.createWhisky(formData);
        } else if (this.alcoolType === 'rhum') {
          console.log('[AddBottle] Appel API: createRhum');
          addBottleObservable = this.rhumService.createRhum(formData);
        } else if (this.alcoolType === 'beer') {
          console.log('[AddBottle] Appel API: createBeer');
          addBottleObservable = this.beerService.createBeer(formData);
        }
        if (addBottleObservable) {
          addBottleObservable.subscribe({
            next: (res: any) => {
              console.log('[AddBottle] Réponse API OK', res);
              this.errorToastMessage = 'Bouteille ajoutée à votre collection !';
              this.showErrorToast = true;
              setTimeout(() => {
                this.showErrorToast = false;
                if (this.alcoolType) {
                  window.location.href = `/collection/${this.alcoolType}`;
                }
              }, 2000);
              setTimeout(() => {
                const toast = document.querySelector('.error-toast');
                if (toast) toast.classList.add('success');
              }, 10);
            },
            error: (err: any) => {
              console.error('[AddBottle] Erreur API', err);
              let message = 'Erreur lors de l’ajout';
              if (err.status === 409) {
                message =
                  'Nom de bouteille déjà existant dans votre collection.';
              } else if (err.message) {
                message += ' : ' + err.message;
              }
              this.errorToastMessage = message;
              this.showErrorToast = true;
              setTimeout(() => {
                const toast = document.querySelector('.error-toast');
                if (toast) toast.classList.remove('success');
              }, 10);
              setTimeout(() => {
                this.showErrorToast = false;
              }, 3000);
            },
          });
        } else {
          console.warn(
            '[AddBottle] Aucun service API appelé, alcoolType:',
            this.alcoolType,
          );
        }
      },
      error: (err: any) => {
        console.error('[AddBottle] Erreur récupération user', err);
        this.errorToastMessage = 'Impossible de récupérer l’utilisateur.';
        this.showErrorToast = true;
        setTimeout(() => {
          this.showErrorToast = false;
        }, 3000);
      },
    });
  }
}
