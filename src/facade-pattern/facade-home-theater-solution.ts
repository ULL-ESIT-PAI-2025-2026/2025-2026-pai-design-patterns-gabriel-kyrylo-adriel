/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2025-2026
 *
 * @author Adriel Reyes Suárez
 * @author Francisco Gabriel Ruiz Ruiz
 * @author Kyrylo Chvanov
 * @since Mar 8 2026
 * @desc Program that solves the complexity of interacting with multiple
 * subsystem classes by implementing the Facade pattern. For academic purposes, 
 * all classes involved will be declared and implemented in this same file.
 * @see {@link https://refactoring.guru/design-patterns/facade}
 */

/**
 * Class that represents a popcorn maker in a home theater setup.
 */
export class PopcornMaker {
  /**
   * Turns the popcorn maker on.
    * @return {void} Does not return a value.
   */
  turnOn(): void { console.log('PopcornMaker: ON'); }

  /**
   * Turns the popcorn maker off.
    * @return {void} Does not return a value.
   */
  turnOff(): void { console.log('PopcornMaker: OFF'); }

  /**
   * Starts the popping process.
    * @return {void} Does not return a value.
   */
  pop(): void { console.log('PopcornMaker: Popping corn...'); }
}

/**
 * Class that represents the lighting system of the room.
 */
export class Lights {
  /**
   * Dims the lights to create a cinematic atmosphere.
    * @return {void} Does not return a value.
   */
  dim(): void { console.log('Lights: Dimming'); }
}

/**
 * Class that represents a television.
 */
export class TV {
  /**
   * Turns the television on.
    * @return {void} Does not return a value.
   */
  turnOn(): void { console.log('TV: ON'); }

  /**
   * Turns the television off.
    * @return {void} Does not return a value.
   */
  turnOff(): void { console.log('TV: OFF'); }
}

/**
 * Class that represents an audio amplifier.
 */
export class Amplifier {
  /**
   * Turns the amplifier on.
    * @return {void} Does not return a value.
   */
  turnOn(): void { console.log('Amplifier: ON'); }

  /**
   * Turns the amplifier off.
    * @return {void} Does not return a value.
   */
  turnOff(): void { console.log('Amplifier: OFF'); }

  /**
   * Sets the input source of the amplifier.
   * @param source Name of the input source (e.g., 'blu-ray').
   * @throws {Error} If the source string is empty.
    * @return {void} Does not return a value.
   */
  setSource(source: string): void {
    if (source.length === 0) {
      throw new Error('Source name cannot be empty.');
    }
    console.log(`Amplifier: Source set to ${source}`);
  }

  /**
   * Sets the volume level of the amplifier.
   * @param level The numerical volume level.
   * @throws {Error} If the volume level is negative.
    * @return {void} Does not return a value.
   */
  setVolume(level: number): void {
    if (level < 0) {
      throw new Error('Volume cannot be negative.');
    }
    console.log(`Amplifier: Volume set to ${level}`);
  }
}

/**
 * Class that represents a Blu-Ray player.
 */
export class BluRayPlayer {
  /**
   * Turns the Blu-Ray player on.
    * @return {void} Does not return a value.
   */
  turnOn(): void { console.log('BluRayPlayer: ON'); }

  /**
   * Turns the Blu-Ray player off.
    * @return {void} Does not return a value.
   */
  turnOff(): void { console.log('BluRayPlayer: OFF'); }

  /**
   * Starts playing the loaded media.
    * @return {void} Does not return a value.
   */
  play(): void { console.log('BluRayPlayer: Playing movie'); }
}

/**
 * Class that acts as a Facade for the Home Theater subsystem.
 * @remarks
 * This class hides the complex logic of initializing and orchestrating 
 * multiple devices behind simple, unified methods. It prevents the client 
 * from needing to understand the underlying subsystem's internal workings.
 */
export class HomeTheaterFacade {
  /**
   * Creates an instance of the HomeTheaterFacade by receiving its dependencies.
   * @param amp Instance of the Amplifier class.
   * @param bluray Instance of the BluRayPlayer class.
   * @param lights Instance of the Lights class.
   * @param tv Instance of the TV class.
   * @param popcornMaker Instance of the PopcornMaker class.
   */
  constructor(
    private readonly amp: Amplifier,
    private readonly bluray: BluRayPlayer,
    private readonly lights: Lights,
    private readonly tv: TV,
    private readonly popcornMaker: PopcornMaker
  ) {}

  /**
   * Orchestrates the complex sequence required to set up the environment
   * for watching a movie.
    * @return {void} Does not return a value.
   */
  watchMovie(): void {
    console.log('--- Starting Movie Setup (Facade) ---');
    this.popcornMaker.turnOn();
    this.popcornMaker.pop();
    this.lights.dim();
    this.tv.turnOn();
    this.amp.turnOn();
    this.amp.setSource('blu-ray');
    this.amp.setVolume(11);
    this.bluray.turnOn();
    this.bluray.play();
  }

  /**
   * Orchestrates the complex sequence required to shut down the environment
   * after a movie ends.
    * @return {void} Does not return a value.
   */
  endMovie(): void {
    console.log('--- Shutting Down Theater (Facade) ---');
    this.amp.turnOff();
    this.tv.turnOff();
    this.bluray.turnOff();
    this.popcornMaker.turnOff();
  }
}

/**
 * Main entry point for the program that exemplifies how the Facade pattern
 * simplifies client interactions.
 * @return {void} Does not return a value.
 */
export function main() {
  // 1. Initialize subsystem components
  const amp = new Amplifier();
  const bluray = new BluRayPlayer();
  const lights = new Lights();
  const tv = new TV();
  const popcornMaker = new PopcornMaker();

  // 2. Inject components into the Facade
  const homeTheater = new HomeTheaterFacade(amp, bluray, lights, tv, popcornMaker);

  // 3. The client code is now completely decoupled from the subsystem complexity
  homeTheater.watchMovie();
  console.log('\n[... Movie is playing ...]\n');
  homeTheater.endMovie();
}

main();

