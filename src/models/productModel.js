export class ProductModel {
    constructor(
      id,
      typeProductId,
      nameProduct,
      price,
      image,
      description,
      cookingTime,
      volume,
      measurementId
    ) {
      this.id = id;
      this.typeProductId = typeProductId;
      this.nameProduct = nameProduct;
      this.price = price;
      this.image = image;
      this.additionalInfo = {
        description: description,
        cookingTime: cookingTime,
        volume: volume,
        measurementId: measurementId,
      };
    }
  }