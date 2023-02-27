# clicker

## Descriptif du projet

Créez votre propre jeu de clic incrémental (idle game). Le but est simple et se déroule
en plusieurs étape :

● Définissez un univers. Afin que votre clicker ait du succès et qu’il soit attractif, il
est important de choisir un thème attrayant et cohérent.

● Lorsqu’un utilisateur clic, il gagne des points.

● Il doit y avoir une boutique. Elle permet de dépenser des points pour acheter des
éléments et des bonus. Les éléments permettent de produire davantage de points, de façon manuelle
(clic) ou automatique (idle). Les bonus quant eux améliorent ces éléments.

● Les éléments et bonus doivent coûter de plus en plus cher et produire de plus en
plus de points ou améliorer les éléments déjà existants.
L’échelle des prix doit rendre l’accession des points quasi exponentielle. Par
exemple, au début de la partie, chaque clic rapporte 1 point.
Au bout d’une minute, à l’aide des éléments et des bonus, chaque clic en rapporte
3, au bout d’une heure 1000, au bout d’un jour 1.000.000.

Il ne faut pas qu’en cas de coupure l’utilisateur perde son avancée. Pour cela, il faut
donc stocker régulièrement l’état de la partie dans le localStorage.
