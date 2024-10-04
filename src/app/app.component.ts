import {Component, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CountdownComponent, CountdownConfig, CountdownEvent, CountdownModule} from "ngx-countdown";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CountdownModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent
{
  animalEmoji:Array<string>;
  shuffledAnimals:string[];
  lastAnimalFound:string = '';
  lastButtonPress:number = 0;
  matchesFound: number = 0;
  timeIsOver:boolean = false;

  //config: { leftTime: number, format: string }; // Configurador de CountDown
  config: CountdownConfig = { leftTime: 10, format: 'ss' };
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent | undefined;
  constructor()
  {
    this.animalEmoji =
    [
      "🐶", "🐶",
      "🐺", "🐺",
      "🐮", "🐮",
      "🦊", "🦊",
      "🐱", "🐱",
      "🦁", "🦁",
      "🐯", "🐯",
      "🐹", "🐹",
    ];
    this.shuffledAnimals = [];
    this.SetupGame();
    // this.config = { leftTime: 10, format: 'ss' };
  }

  SetupGame(){
    let currentIndex = this.animalEmoji.length, temporaryValue, randomIndex;
    this.shuffledAnimals = this.animalEmoji;
    // Mientras queden elementos a mezclar
    while (currentIndex !== 0)
    {
      // Seleccionar un elemento restante
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Intercambiar con el elemento actual
      temporaryValue = this.shuffledAnimals[currentIndex];
      this.shuffledAnimals[currentIndex] = this.shuffledAnimals[randomIndex];
      this.shuffledAnimals[randomIndex] = temporaryValue;
    }
    this.matchesFound = 0;
    this.countdown?.restart();
  }

  ButtonClick(animal:string, animalNumber:number){
    if (this.lastAnimalFound == "")
    {
      this.lastAnimalFound = animal;
      this.lastButtonPress = animalNumber;
    }
    else if ((this.lastAnimalFound == animal) && animalNumber != this.lastButtonPress)
    {
      this.lastAnimalFound = "";
      console.log('You found the animal!');
      this.shuffledAnimals = this.shuffledAnimals.map(a => a.replace(animal,""));
      this.matchesFound++;
      if (this.matchesFound == 8)
      {
        this.SetupGame();
      }
    }
    else
    {
      this.lastAnimalFound = "";
    }
  }

  handleEvent(e: CountdownEvent)
  {
    if (e.action == "done"){
      this.SetupGame()
    }

  }
}
