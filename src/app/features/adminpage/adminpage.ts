import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LabelService } from '../../core/services/bottle/label.service';
import { PeatLevelService } from '../../core/services/bottle/peatLevel.service';
import { TypeService } from '../../core/services/bottle/type.service';
import { User, UserService } from '../../core/services/user.service';

import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { Label } from '../../models/label.interface';
import { PeatLevel } from '../../models/peatLevel.interface';
import { Type } from '../../models/type.interface';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.html',
  styleUrls: ['./adminpage.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class Adminpage implements OnInit {
  labels: Label[] = [];
  peatlevels: PeatLevel[] = [];
  types: Type[] = [];
  users: User[] = [];
  currentUserId = '';

  // Formulaires d'ajout
  newLabelName = '';
  newPeatLevelName = '';
  newTypeName = '';

  // Édition
  editLabelId: number | null = null;
  editLabelName = '';
  editPeatId: number | null = null;
  editPeatName = '';
  editTypeId: number | null = null;
  editTypeName = '';

  constructor(
    private labelService: LabelService,
    private peatLevelService: PeatLevelService,
    private typeService: TypeService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadAll();
    // Get cookie token at start
    const token = this.authService.getToken();
  }

  // Suppression d'utilisateur
  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.loadAll();
      },
      error: (err: any) => {
        console.error(
          "[ADMINPAGE] Erreur lors de la suppression de l'utilisateur:",
          err,
        );
      },
    });
  }

  // Pour le bouton retour
  goToMainpage(): void {
    this.router.navigate(['/mainpage']);
  }

  loadAll(): void {
    this.labelService.getAllLabel().subscribe((labels) => {
      this.labels = labels;
    });

    this.peatLevelService.getAllPeatLevel().subscribe((peatlevels) => {
      this.peatlevels = peatlevels;
    });

    this.typeService.getAllType().subscribe((types) => {
      this.types = types;
    });

    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });

    this.authService.getMe().subscribe((user) => {
      this.currentUserId = user.id;
    });
  }

  // LABELS
  addLabel(): void {
    if (!this.newLabelName.trim()) return;
    this.labelService
      .createLabel({ name: this.newLabelName, color: '#000', id: 0 })
      .subscribe({
        next: () => {
          this.newLabelName = '';
          this.loadAll();
        },
        error: (err) => {
          console.error("[ADMINPAGE] Erreur lors de l'ajout du label:", err);
        },
      });
  }

  deleteLabel(label: Label): void {
    this.labelService.deleteLabel(label.id).subscribe({
      next: () => {
        this.loadAll();
      },
      error: (err) => {
        console.error(
          '[ADMINPAGE] Erreur lors de la suppression du label:',
          err,
        );
      },
    });
  }

  startEditLabel(label: Label): void {
    this.editLabelId = label.id;
    this.editLabelName = label.name;
  }

  saveEditLabel(label: Label): void {
    if (!this.editLabelName.trim()) return;

    this.labelService
      .updateLabel(label.id, { ...label, name: this.editLabelName })
      .subscribe({
        next: () => {
          this.cancelEditLabel();
          this.loadAll();
        },
        error: (err) => {
          console.error(
            '[ADMINPAGE] Erreur lors de la modification du label:',
            err,
          );
        },
      });
  }

  cancelEditLabel(): void {
    this.editLabelId = null;
    this.editLabelName = '';
  }

  // PEATLEVELS
  addPeatLevel(): void {
    if (!this.newPeatLevelName.trim()) return;
    this.peatLevelService
      .createPeatLevel({ name: this.newPeatLevelName, id: 0 })
      .subscribe(() => {
        this.newPeatLevelName = '';
        this.loadAll();
      });
  }

  deletePeatLevel(peat: PeatLevel): void {
    this.peatLevelService
      .deletePeatLevel(peat.id)
      .subscribe(() => this.loadAll());
  }

  startEditPeat(peat: PeatLevel): void {
    this.editPeatId = peat.id;
    this.editPeatName = peat.name;
  }

  saveEditPeat(peat: PeatLevel): void {
    if (!this.editPeatName.trim()) return;
    this.peatLevelService
      .updatePeatLevel(peat.id, { ...peat, name: this.editPeatName })
      .subscribe(() => {
        this.cancelEditPeat();
        this.loadAll();
      });
  }

  cancelEditPeat(): void {
    this.editPeatId = null;
    this.editPeatName = '';
  }

  // TYPES
  addType(): void {
    if (!this.newTypeName.trim()) return;
    this.typeService
      .createType({
        name: this.newTypeName,
        id: 0,
        forWhisky: false,
        forRhum: false,
        forBeer: false,
      })
      .subscribe(() => {
        this.newTypeName = '';
        this.loadAll();
      });
  }

  deleteType(type: Type): void {
    this.typeService.deleteType(type.id).subscribe(() => this.loadAll());
  }

  startEditType(type: Type): void {
    this.editTypeId = type.id;
    this.editTypeName = type.name;
  }

  saveEditType(type: Type): void {
    if (!this.editTypeName.trim()) return;
    this.typeService
      .updateType(type.id, { ...type, name: this.editTypeName })
      .subscribe(() => {
        this.cancelEditType();
        this.loadAll();
      });
  }

  cancelEditType(): void {
    this.editTypeId = null;
    this.editTypeName = '';
  }

  // Getters to sort alcools
  get whiskyTypes(): Type[] {
    return this.types.filter((t) => t.forWhisky);
  }
  get rhumTypes(): Type[] {
    return this.types.filter((t) => t.forRhum);
  }
  get beerTypes(): Type[] {
    return this.types.filter((t) => t.forBeer);
  }
}
