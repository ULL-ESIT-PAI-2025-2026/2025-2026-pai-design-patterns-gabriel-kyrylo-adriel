/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2025-2026
 *
 * @author Adriel Reyes Suárez
 * @author Francisco Gabriel Ruiz Ruiz
 * @author Kyrylo Chvanov
 * @since Mar 7 2026
 * @desc Program that solves the incompatibility issue using the adapter pattern 
 * by wrapping the external service and translating its data.
 * @see {@link https://refactoring.guru/design-patterns/adapter}
 */

/**
 * Class that represents a target object. This is the interface our 
 * program currently understands.
 */
class Product {
  /**
   * Creates an instance of the target Product.
   * @param price Price of the product in Euros.
   */
  constructor(protected readonly price: number) {}

  /**
   * Gets the price of the product in Euros.
   * @return The price value.
   */
  getPriceEuros(): number {
    return this.price;
  }
}

/**
 * Adaptee class. Represents the external library we need to use, 
 * but its interface is incompatible with our system.
 */
class ExternalService {
  /**
   * Returns a specific amount.
   * @return The amount in Dollars.
   */
  getAmountInDollars(): number {
    return 10.50; // $10.50
  }
}

/**
 * Adapter class that allows the incompatible ExternalService to collaborate
 * with our program. Inherits from the target class. Translates incompatible
 * data (Dollars to Euros).
 */
class MoneyAdapter extends Product {
  /**
   * Creates an instance using the adaptee.
   * @param externalService The external service being wrapped.
   * @remark
   * TypeScript requires calling the parent class constructor ('super()') 
   * when extending a class. The dummy value passed here (0) is not 
   * actually overwritten, but rather safely ignored, because we override 
   * the 'getPriceEuros' method to compute the price dynamically via the
   * adaptee.
   */
  constructor(private externalService: ExternalService) {
    super(0); // This value will be ignored later on...
  }

  /**
   * Overrides the target's method to translate the external data.
   * @return The converted price in Euros.
   * @remark
   * The override is crucial for the adaptar pattern to work. If this function
   * didn't override (because, for example, it had a different name), the
   * program would not work!
   */
  getPriceEuros(): number {
    const dollars = this.externalService.getAmountInDollars();
    const conversionRate = 0.92;
    return dollars * conversionRate; // Conversion: USD -> Euros
  }
}

/**
 * Prints the price of a given product.
 * @param product The product whose price will be printed.
 */
function printPrice(product: Product): void {
  console.log(`Price: ${product.getPriceEuros()} €`);
}

/**
 * Main entry point for the program that exemplifies the adapter pattern
 * solution.
 */
function main() {
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

  // Instead, let's use our adapter: we wrap the incompatible service inside it.
  const adapter = new MoneyAdapter(service);
  // Now this works!
  printPrice(adapter); // MoneyAdapter has overriden the getPriceEuros function!
}

main();