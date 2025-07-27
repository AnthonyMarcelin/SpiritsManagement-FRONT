import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import ImageKit from 'imagekit-javascript';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
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
  imagekit: ImageKit;
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
    private http: HttpClient,
  ) {
    this.imagekit = new ImageKit({
      publicKey: environment.imagekitPublicKey,
      urlEndpoint: environment.imagekitUrlEndpoint,
    });
  }

  async uploadPhotoToImageKit(file: File): Promise<string> {
    // 1. Récupérer le token d'authentification auprès du backend
    const authData: any = await firstValueFrom(
      this.http.get(environment.imagekitAuthEndpoint, {
        withCredentials: true,
      }),
    );
    // 2. Uploader l'image avec les bons paramètres
    return new Promise((resolve, reject) => {
      this.imagekit.upload(
        {
          file,
          fileName: file.name,
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
  }

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
      const file = input.files[0];
      const img = new Image();
      const reader = new FileReader();
      reader.onload = (e: any) => {
        img.src = e.target.result;
        this.photoPreviewUrl = e.target.result;
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
                const resizedFile = new File([blob], file.name, {
                  type: 'image/jpeg',
                });
                this.selectedPhoto = resizedFile;
              } else {
                this.selectedPhoto = file;
              }
            },
            'image/jpeg',
            0.85,
          );
        };
      };
      reader.readAsDataURL(file);
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

  async onAddBottle() {
    this.authService.getMe().subscribe({
      next: async (user: any) => {
        this.bottle.userId = user?.id;
        let photoUrl = '';
        if (this.selectedPhoto) {
          try {
            photoUrl = await this.uploadPhotoToImageKit(this.selectedPhoto);
            console.log('[AddBottle] URL ImageKit:', photoUrl);
          } catch (err) {
            this.errorToastMessage = 'Erreur upload ImageKit';
            this.showErrorToast = true;
            setTimeout(() => {
              this.showErrorToast = false;
            }, 3000);
            return;
          }
        }
        // Création du FormData avec l'URL de la photo
        const formData = new FormData();
        Object.entries(this.bottle).forEach(([key, value]) => {
          if (value !== null && value !== undefined && key !== 'photo') {
            formData.append(key, value as string);
          }
        });
        if (photoUrl) {
          formData.append('photo', photoUrl);
        }
        // Log du contenu du FormData
        for (const pair of formData.entries()) {
          console.log(`[AddBottle] FormData: ${pair[0]} =`, pair[1]);
        }
        let addBottleObservable;
        if (this.alcoolType === 'whisky') {
          addBottleObservable = this.whiskyService.createWhisky(formData);
        } else if (this.alcoolType === 'rhum') {
          addBottleObservable = this.rhumService.createRhum(formData);
        } else if (this.alcoolType === 'beer') {
          addBottleObservable = this.beerService.createBeer(formData);
        }
        if (addBottleObservable) {
          addBottleObservable.subscribe({
            next: (res: any) => {
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
        this.errorToastMessage = 'Impossible de récupérer l’utilisateur.';
        this.showErrorToast = true;
        setTimeout(() => {
          this.showErrorToast = false;
        }, 3000);
      },
    });
  }
}
