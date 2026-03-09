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
 * @desc Program that follows the builder pattern and implements a director to
 * standardize object building.
 * @see {@link https://refactoring.guru/design-patterns/builder}
 * @see {@link https://stackoverflow.com/a/39458448}
 * @see {@link https://en.wikipedia.org/wiki/Don%27t_repeat_yourself}
 */

/**
 * Class that represents a generic user with a name, DNI, address and city
 * (both simplified to be represented as a string). Its builder is the
 * class UserBuilder.
 */
class User {
  /**
   * Creates an instance of the object User given a name and optionally a DNI,
   * address and city (both as strings). Does not thoroughly check if the
   * input is valid.
   * @param name First name of the user.
   * @param dni National Identity Card of the user.
   * @param address Simplified address of the user.
   * @param city Name of the city the user lives in. 
   * @throws {Error} If the name is an empty string.
   * @remarks
   * The builder pattern allows us to delegate the construction logic and
   * validation to specialized builder classes, keeping this constructor 
   * clean while still ensuring object integrity.
   */
  constructor(private readonly name: string, private readonly dni?: number,
      private readonly address?: string, private readonly city?: string) {
    if (this.name.length === 0) {
      throw new Error('Tried to create an instance of User with an empty name!');
    }
  }

  /**
   * Returns a string representation of the user.
   */
  public toString(): string {
    return `User(name: ${this.name}, dni: ${this.dni || 'N/A'}, ` +
        `address: ${this.address || 'N/A'}, city: ${this.city || 'N/A'})`;
  }
}

/**
 * Abstract Builder class to enable polymorphism.
 * @remarks
 * According to the design pattern principles, builders must be related 
 * (interface or abstract class) for the Director to work with different
 * concrete implementations interchangeably.
 */
abstract class AbstractUserBuilder {
  /**
   * Sets the name for the user.
   */
  abstract setName(name: string): AbstractUserBuilder;
  /**
   * Sets the DNI for the user.
   */
  abstract setDni(dni: number): AbstractUserBuilder;
  /**
   * Sets the address for the user.
   */
  abstract setAddress(address: string): AbstractUserBuilder;
  /**
   * Sets the city for the user.
   */
  abstract setCity(city: string): AbstractUserBuilder;
  /**
   * Produces the final User object.
   */
  abstract build(): User;
  /**
   * Resets the builder state.
   */
  abstract reset(): void;
}

/**
 * Concrete implementation of a RedUserBuilder.
 */
class RedUserBuilder extends AbstractUserBuilder {
  private name: string = '';
  private dni?: number;
  private address?: string;
  private city?: string;

  /**
   * Sets the name for the red user.
   * @param name First name of the user.
   * @return The builder instance for chaining.
   * @throws {Error} If the name is an empty string.
   */
  setName(name: string): RedUserBuilder {
    if (name.length === 0) throw new Error('User name cannot be empty.');
    this.name = `Red-${name}`;
    return this;
  }

  /**
   * Sets the DNI for the red user.
   * @param dni National Identity Card.
   * @return The builder instance for chaining.
   * @throws {Error} If the DNI is not a positive number.
   */
  setDni(dni: number): RedUserBuilder {
    if (dni <= 0) throw new Error('DNI must be a positive number.');
    this.dni = dni;
    return this;
  }

  /**
   * Sets the address for the red user.
   * @param address Simplified address.
   * @return The builder instance for chaining.
   */
  setAddress(address: string): RedUserBuilder {
    this.address = address;
    return this;
  }

  /**
   * Sets the city for the red user.
   * @param city Name of the city.
   * @return The builder instance for chaining.
   */
  setCity(city: string): RedUserBuilder {
    this.city = city;
    return this;
  }

  /**
   * Resets the builder to its default state.
   */
  reset(): void {
    this.name = '';
    this.dni = undefined;
    this.address = undefined;
    this.city = undefined;
  }

  /**
   * Produces the final User object and resets the builder.
   * @return A new User instance.
   */
  build(): User {
    const builtUser = new User(this.name, this.dni, this.address, this.city);
    this.reset();
    return builtUser;
  }
}

/**
 * Concrete implementation of a BlueUserBuilder.
 * Inherits from the same target to be used by the Director.
 */
class BlueUserBuilder extends AbstractUserBuilder {
  private name: string = '';
  private dni?: number;
  private address?: string;
  private city?: string;

  /**
   * Sets the name with a specific 'Blue' prefix.
   * @param name First name of the user.
   * @return The builder instance for chaining.
   */
  setName(name: string): BlueUserBuilder {
    this.name = `Blue-${name}`; 
    return this;
  }

  /**
   * Sets the DNI for the blue user.
   * @param dni National Identity Card.
   * @return The builder instance for chaining.
   */
  setDni(dni: number): BlueUserBuilder {
    this.dni = dni;
    return this;
  }

  /**
   * Sets the address for the blue user.
   * @param address Simplified address.
   * @return The builder instance for chaining.
   */
  setAddress(address: string): BlueUserBuilder {
    this.address = address;
    return this;
  }

  /**
   * Sets the city for the blue user.
   * @param city Name of the city.
   * @return The builder instance for chaining.
   */
  setCity(city: string): BlueUserBuilder {
    this.city = city;
    return this;
  }

  /**
   * Resets the builder state.
   */
  reset(): void {
    this.name = '';
    this.dni = undefined;
    this.address = undefined;
    this.city = undefined;
  }

  /**
   * Produces the final User object and resets the builder.
   * @return A new User instance.
   */
  build(): User {
    const builtUser = new User(this.name, this.dni, this.address, this.city);
    this.reset();
    return builtUser;
  }
}

/**
 * The director defines the order in which to execute the building steps.
 * @remarks
 * The director follows the same 'recipe' for any given builder, allowing
 * for the standardization of complex configurations.
 */
class UserDirector {
  /**
   * Builds a default user with predefined parameters: name 'x' and city 'LL'.
   * @param builder The concrete builder to use for construction.
   * @return The resulting User object.
   */
  buildDefaultUser(builder: AbstractUserBuilder): User {
    return builder.setName('x').setCity('LL').build();
  }
}

/**
 * Main entry point for the program that exemplifies how the builder pattern
 * works with a director.
 */
function main() {
  const redUserBuilder = new RedUserBuilder();
  const blueUserBuilder = new BlueUserBuilder();

  // The following code is repetitive and violates the DRY principle:
  const red1: User = redUserBuilder.setName('x').setCity('LL').build();
  console.log(`Red User 1: ${red1.toString()}`);
  const blue1: User = blueUserBuilder.setName('x').setCity('LL').build();
  console.log(`Blue User 1: ${blue1.toString()}`);

  // The following code uses a director and is much cleaner
  const director = new UserDirector();
  const red2: User = director.buildDefaultUser(redUserBuilder); // Building a Red User using the Director
  console.log(`Red User 2: ${red2.toString()}`);
  const blue2: User = director.buildDefaultUser(blueUserBuilder); // Building a Blue User using the same Director recipe
  console.log(`Blue User 2: ${blue2.toString()}`);
}

main();