/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2025-2026
 *
 * @author Adriel Reyes Suárez
 * @author Francisco Gabriel Ruiz Ruiz
 * @author Kyrylo Chvanov
 * @since Mar 12 2026
 * @desc Program that exemplifies a problem where an incompatible external service 
 * cannot be used with existing code, motivating the use of the adapter pattern.
 * @see {@link https://refactoring.guru/design-patterns/adapter}
 */

/**
 * @desc Class that represents a product with an associated price in Euros.
 * @remark
 * It represents the target object. This is essentially the interface our
 * program currently understands.
 */
export class Product {
  /**
   * @desc Creates an instance of the target Product.
   * @param priceEuros Price of the product in Euros.
   */
  constructor(protected readonly priceEuros: number) {}

  /**
   * @desc Gets the price of the product in Euros.
   * @return The price value.
   */
  getPriceEuros(): number {
    return this.priceEuros;
  }
}

/**
 * @desc Adaptee class. Represents the external library we need to use, 
 * but its interface is incompatible with our system.
 */
export class ExternalService {
  /**
   * @desc Returns a specific amount.
   * @return The amount in Dollars.
   */
  getAmountInDollars(): number {
    return 10.50; // $10.50
  }
}

/**
 * @desc Prints the price of a given product.
 * @param product The product whose price will be printed.
 * @remark
 * The function is never used in the program so that it compiles (see the main
 * function below for the reason behind this).
 */
export function printPrice(product: Product): void {
  console.log(`Price: ${product.getPriceEuros()} €`);
}

/**
 * @desc Main entry point for the program that exemplifies the adapter pattern problem.
 */
export function main() {
  console.log('Processing our local product: Gang of Four book...');
  const gangOfFourBookPrice = 56.82; // In Euros
  const gangOfFourBook = new Product(gangOfFourBookPrice);
  printPrice(gangOfFourBook);

  // We now want to use an ExternalService in our program...
  console.log('Processing an external product/service...');
  const service = new ExternalService();
  // printPrice(service);
  // The line above would not compile because 'service' isn't a Product and
  // we can't change that (it's an external library/service).

  console.log('Error: ExternalService cannot be used directly with ' +
      'printPrice() due to incompatible interfaces.');
}

main();
