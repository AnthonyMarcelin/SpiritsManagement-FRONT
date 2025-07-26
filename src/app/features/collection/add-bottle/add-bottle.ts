import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

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
export class AddBottle {
  alcoolType: 'whisky' | 'rhum' | 'beer' = 'whisky';
  peatLevels = [
    { id: 1, name: 'Non tourbé' },
    { id: 2, name: 'Peu tourbé' },
    { id: 3, name: 'Moyennement tourbé' },
    { id: 4, name: 'Très tourbé' },
    { id: 5, name: 'Extrême tourbé' },
    { id: 6, name: 'Iodé' },
    { id: 7, name: 'Médicinal' },
    { id: 8, name: 'Fumé' },
    { id: 9, name: 'Terreux' },
    { id: 10, name: 'Tourbé' },
    { id: 11, name: 'Tourbé côtier' },
    { id: 12, name: 'Épicé' },
    { id: 13, name: 'Doux' },
  ];
  types = [
    // Whisky
    { id: 1, name: 'Single Malt', for_whisky: true },
    { id: 2, name: 'Blended Malt', for_whisky: true },
    { id: 3, name: 'Single Grain', for_whisky: true },
    // Rhum
    { id: 10, name: 'Blanc', for_rhum: true },
    { id: 11, name: 'Ambré', for_rhum: true },
    { id: 12, name: 'Vieux', for_rhum: true },
    // Bière
    { id: 20, name: 'IPA (India Pale Ale)', for_beer: true },
    { id: 21, name: 'Hefeweizen', for_beer: true },
    { id: 22, name: 'Stout', for_beer: true },
    { id: 23, name: 'Punk IPA', for_beer: true },
  ];

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

  get filteredTypes() {
    if (this.alcoolType === 'whisky') {
      return this.types.filter((t: any) => t.for_whisky);
    } else if (this.alcoolType === 'rhum') {
      return this.types.filter((t: any) => t.for_rhum);
    } else if (this.alcoolType === 'beer') {
      return this.types.filter((t: any) => t.for_beer);
    }
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

  // Pour afficher/masquer le champ PeatLevel selon le type
  get showPeatLevel() {
    return this.alcoolType === 'whisky';
  }

  constructor(private route: ActivatedRoute) {
    // Récupère le type d'alcool depuis l'URL (ex: /collection/whisky/add-bottle)
    this.route.url.subscribe((segments) => {
      const typeSegment = segments.find((seg) =>
        ['whisky', 'rhum', 'beer'].includes(seg.path),
      );
      if (typeSegment) {
        this.alcoolType = typeSegment.path as 'whisky' | 'rhum' | 'beer';
      }
    });
  }

  onAddBottle() {
    // Récupérer l'id du user connecté (exemple)
    // this.bottle.userId = this.authService.getUserId();

    // Appel à l'API pour ajouter la bouteille dans la collection du user
    // this.apiService.addBottleToCollection(this.bottle).subscribe({
    //   next: () => {
    //     alert('Bouteille ajoutée à votre collection !');
    //     // Redirection ou reset du formulaire si besoin
    //   },
    //   error: (err) => {
    //     alert('Erreur lors de l’ajout : ' + err.message);
    //   }
    // });

    // Pour test sans API :
    alert('Bouteille ajoutée à votre collection !');
  }
}
