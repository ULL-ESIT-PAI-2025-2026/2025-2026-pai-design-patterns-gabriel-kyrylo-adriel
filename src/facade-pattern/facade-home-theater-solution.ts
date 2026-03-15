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

/** @desc Class that represents a popcorn maker in a home theater setup. */
export class PopcornMaker {
  /** @desc Turns the popcorn maker on. */
  turnOn(): void {
    console.log('PopcornMaker: ON');
  }

  /** @desc Turns the popcorn maker off. */
  turnOff(): void {
    console.log('PopcornMaker: OFF');
  }

  /** @desc Starts the popping process. */
  pop(): void { 
    console.log('PopcornMaker: Popping corn...');
  }
}

/** @desc Class that represents the lighting system of the room. */
export class Lights {
  /** @desc Dims the lights to create a cinematic atmosphere. */
  dim(): void { 
    console.log('Lights: Dimming');
  }
}

/** @desc Class that represents a television. */
export class Television {
  /** @desc Turns the television on. */
  turnOn(): void { 
    console.log('TV: ON');
  }

  /** @desc Turns the television off. */
  turnOff(): void { 
    console.log('TV: OFF');
  }
}

/** @desc Class that represents an audio amplifier. */
export class Amplifier {
  /** @desc Turns the amplifier on. */
  turnOn(): void { 
    console.log('Amplifier: ON');
  }

  /** @desc Turns the amplifier off. */
  turnOff(): void { 
    console.log('Amplifier: OFF');
  }

  /** @desc Sets the input source of the amplifier. */
  setSource(source: string): void {
    if (source.length === 0) {
      throw new Error('Source name cannot be empty.');
    }
    console.log(`Amplifier: Source set to ${source}`);
  }

  /** @desc Sets the volume level of the amplifier. */
  setVolume(level: number): void {
    if (level < 0) {
      throw new Error('Volume cannot be negative.');
    }
    console.log(`Amplifier: Volume set to ${level}`);
  }
}

/** @desc Class that represents a Blu-Ray player. */
export class BluRayPlayer {
  /** @desc Turns the Blu-Ray player on. */
  turnOn(): void { 
    console.log('BluRayPlayer: ON');
  }

  /** @desc Turns the Blu-Ray player off. */
  turnOff(): void { 
    console.log('BluRayPlayer: OFF');
  }

  /** @desc Starts playing the loaded media. */
  play(): void { 
    console.log('BluRayPlayer: Playing movie');
  }
}

/**
 * @desc Class that acts as a Facade for the Home Theater subsystem.
 * @remarks
 * This class hides the complex logic of initializing and orchestrating 
 * multiple devices behind simple, unified methods. It prevents the client 
 * from needing to understand the underlying subsystem's internal workings.
 */
export class HomeTheaterFacade {
  /**
   * @desc Creates an instance of the HomeTheaterFacade by receiving its
   * dependencies.
   * @param amplifier Instance of the Amplifier class.
   * @param bluray Instance of the BluRayPlayer class.
   * @param lights Instance of the Lights class.
   * @param television Instance of the TV class.
   * @param popcornMaker Instance of the PopcornMaker class.
   */
  constructor(private readonly amplifier: Amplifier, private readonly bluray: BluRayPlayer, private readonly lights: Lights,
              private readonly television: Television, private readonly popcornMaker: PopcornMaker) {}

  /** @desc Orchestrates the complex sequence required to set up the environment for watching a movie. */
  watchMovie(): void {
    console.log('--- Starting Movie Setup (Facade) ---');
    this.popcornMaker.turnOn();
    this.popcornMaker.pop();
    this.lights.dim();
    this.television.turnOn();
    this.amplifier.turnOn();
    this.amplifier.setSource('blu-ray');
    this.amplifier.setVolume(11);
    this.bluray.turnOn();
    this.bluray.play();
  }

  /** @desc Orchestrates the complex sequence required to shut down the environment after a movie ends. */
  endMovie(): void {
    console.log('--- Shutting Down Theater (Facade) ---');
    this.amplifier.turnOff();
    this.television.turnOff();
    this.bluray.turnOff();
    this.popcornMaker.turnOff();
  }
}

/** @desc Main entry point for the program that exemplifies how the Facade pattern simplifies client interactions. */
export function main() {
  // 1. Initialize subsystem components
  const amplifier = new Amplifier();
  const bluray = new BluRayPlayer();
  const lights = new Lights();
  const television = new Television();
  const popcornMaker = new PopcornMaker();

  // 2. Inject components into the Facade
  const homeTheater = new HomeTheaterFacade(amplifier, bluray, lights, television, popcornMaker);

  // 3. The client code is now completely decoupled from the subsystem complexity
  homeTheater.watchMovie();
  console.log('\n[... Movie is playing ...]\n');
  homeTheater.endMovie();
}

main();
