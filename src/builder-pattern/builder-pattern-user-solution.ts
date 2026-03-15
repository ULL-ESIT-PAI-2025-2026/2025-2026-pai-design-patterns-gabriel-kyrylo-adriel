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
 * @desc Program that solves telescoping constructor issues and massive
 * constructors following the builder pattern. For academic purposes,
 * all classes involved will be declared and implemented in this same file.
 * @see {@link https://refactoring.guru/design-patterns/builder}
 * @see {@link https://www.captaindebug.com/2011/05/telescoping-constructor-antipattern}
 */

/**
 * @desc Class that represents a generic user with a name, DNI, address and
 * city (both simplified to be represented as a string). Its builder is the
 * class UserBuilder.
 */
export class User {
  /**
   * @desc Creates an instance of the object User given a name and optionally a DNI,
   * address and city (both as strings). Does not thoroughly check if the
   * input is valid.
   * @param name First name of the user.
   * @param dni National Identity Card of the user.
   * @param address Simplified address of the user.
   * @param city Name of the city the user lives in. 
   * @throws {Error} If the name is an empty string.
   * @remarks
   * The constructor may have been private or protected, forcing the creation
   * of the User objects to be made through the builder class UserBuilder. It
   * is also worth noting that the UserBuilder will now check for input errors
   * in a much cleaner and modular way rather than doing it all in the
   * constructor.
   */
  constructor(private readonly name: string, private readonly dni?: number,
      private readonly address?: string, private readonly city?: string) {
    if (this.name.length === 0) {
      throw new Error('Tried to create an instance of User with an empty name!');
    }
  }

  /**
   * @desc Returns a string that is a representation of the user.
   * @return String that details all the known data about the user.
   */
  toString(): string {
    return `User(name: ${this.name}, dni: ${this.dni || 'N/A'}, ` +
        `address: ${this.address || 'N/A'}, city: ${this.city || 'N/A'})`;
  }
}

/**
 * @desc Class that is the builder of the object User.
 * @remarks
 * One of the main advantages of the Builder pattern is that it allows for
 * granular validation. Instead of having a single massive validation block
 * in the Product's constructor, we can throw errors as soon as incorrect data
 * is provided to the setter methods.
 */
export class UserBuilder {
  private name: string = ''; /** @desc First name of the user to be built. */
  private dni?: number; /** @desc National Identity Card of the user to be built. */
  private address?: string; /** @desc Simplified address of the user to be built. */
  private city?: string; /** @desc Name of the city the user to be built lives in. */

  /**
   * @desc Sets the name for the user.
   * @param name First name of the user.
   * @return The builder instance for chaining.
   * @throws {Error} If the name is an empty string.
   */
  setName(name: string): UserBuilder {
    if (name.length === 0) {
      throw new Error('User name cannot be empty.');
    }
    this.name = name;
    return this;
  }

  /**
   * @desc Sets the DNI for the user.
   * @param dni National Identity Card of the user.
   * @return The builder instance for chaining.
   * @throws {Error} If the DNI is not a positive number.
   */
  setDni(dni: number): UserBuilder {
    if (dni <= 0) {
      throw new Error('DNI must be a positive number.');
    }
    this.dni = dni;
    return this;
  }

  /**
   * @desc Sets the address for the user.
   * @param address Simplified address of the user.
   * @return The builder instance for chaining.
   * @throws {Error} If the address is an empty string.
   */
  setAddress(address: string): UserBuilder {
    if (address.length === 0) {
      throw new Error('Address cannot be empty.');
    }
    this.address = address;
    return this;
  }

  /**
   * @desc Sets the city for the user.
   * @param city Name of the city the user lives in.
   * @return The builder instance for chaining.
   * @throws {Error} If the city is an empty string.
   */
  setCity(city: string): UserBuilder {
    if (city.length === 0) {
      throw new Error('City cannot be empty.');
    }
    this.city = city;
    return this;
  }

  /** @desc Resets the builder to its default empty state. */
  reset(): void {
    this.name = '';
    this.dni = undefined;
    this.address = undefined;
    this.city = undefined;
  }

  /**
   * @desc Produces the final User object. 
   * @return A new User instance.
   */
  build(): User {
    const builtUser = new User(this.name, this.dni, this.address, this.city);
    this.reset();
    return builtUser;
  }
}

/**
 * @desc Main entry point for the program that exemplifies how the builder
 * pattern works.
 */
export function main() {
  // Create an instance of the builder
  const userBuilder = new UserBuilder();
  // The builder returns an instance of User
  const jorge: User = userBuilder.setName('Jorge').setDni(12345678).build();
  console.log(jorge.toString());
  // No need to initialize unknown variables
  const abel: User = userBuilder.setName('Abel').setCity('Sta. Cruz').build();
  console.log(abel.toString());
}

main();
