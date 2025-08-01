# Nom pour l'appli

https://chatgpt.com/share/686d8ca3-0b70-8000-b143-31ec08a840e3

# Design

[Maquette]](image.png)

# A faire en back

<!-- rajoute run route /me au routeur et middleware verifyToken -->

# A faire en front

regler ce probleme de message d'error au register quand les mots de passe sont differents.

<!-- faire un dark mode -->
<!-- validation par mail, reset password -->

<!-- RGPD -->

<!-- afficher lors du register pour les manquants du schema back (il manque 1 carac, special, mdp trop court ect) -->

gerer suppression du compte avec validation par mail : bien dire que toute la collection sera perdue

<!-- toast pour user qui se co sans etre verifie : apres inscription, erreur serveur apres se connecter : il faut expliciter le fait de valider avant -->

<!-- systeme de renvoi de mail de verification si non recu ou delete dans les mails  -->

refaire css template mail

<!-- refaire page apres validation de mail, css pas bon, logo trop gros. Et ne pas faire disparaitre mais plutot un bouton vers login -->

<!-- Message en front pour signifier case rateLimiter : 5 tentatives puis blocage 1 min -->

<!-- virer les logs -->

bio / description pour v2

modif du mail dans mon profil pour v2

<!-- clean code -->

<!-- mettre euro bottlepage -->

<!-- mettre nom dans mainpage -->

modif auth

couleur label et tri collection par label

Mdp au register dans le payload

Promise register

Favicon

ajout bouteille : on peut uniquement prendre uen photo
Modif bouteille, on peut choisir prendre photo ou bibliotheque
note obligatoire ? apparement erreur si pas de note.
Et bloque la note entre 1 et 10
