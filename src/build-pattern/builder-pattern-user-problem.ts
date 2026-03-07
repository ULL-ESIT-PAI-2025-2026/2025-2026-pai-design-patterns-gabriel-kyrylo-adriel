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
 * @desc Program that exemplifies the problems that can be solved with the
 * builder pattern. For academic purposes, all classes involved will be
 * declared and implemented in this same file.
 * @see {@link https://refactoring.guru/design-patterns/builder}
 * @see {@link https://www.captaindebug.com/2011/05/telescoping-constructor-antipattern}
 */

/**
 * Class that represents a generic user with a name, DNI, address and city
 * (both simplified to be represented as a string).
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
   * @remark
   * Another practice (known as anti pattern) that the builder pattern also
   * aims to solve is the telescoping constructor (anti)pattern. In a nutshell,
   * it refers to the practice of overloading a constructor to cover many
   * different parameter combinations.
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
 * Main entry point for the program that exemplifies what the builder pattern
 * aims to solve.
 */
function main() {
  // I know the name and dni - constructor seems fine.
  const jorge = new User('Jorge', 12345678);
  console.log(jorge.toString());
  // I only know the name and city...
  const abel = new User('Abel', 0, '', 'Sta. Cruz');
  console.log(abel.toString());
  // Conclusion: this constructor is not comfortable to work with!
}

main();