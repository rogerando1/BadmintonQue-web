import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


interface Player {
  Num: number;
  PlayerName: string;
  Game: number;
  Wins: number;
  Lose: number;
  Status: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BadmintonQue-web';

  playerList: Player[] = [];
  playerGameList: Player[] = [];
  count = 0;

  playerdetails: Player = {
    Num: 0,
    PlayerName: '',
    Game: 0,
    Wins: 0,
    Lose: 0,
    Status: ''
  };

  playerNames = '';
  isStart = false;
  team1: Player [] = [];
  team2: Player [] = [];
  team1Score: any;
  team2Score: any;

  onButton(field: string) {
    if (field === 'Start') {
    if(this.playerList.length > 3){
      const waitingPlayer = this.playerList.filter(q => q.Status == 'Waiting');
      this.playerGameList = waitingPlayer.sort((a, b) => ((a.Game ?? 0) - (b.Game ?? 0))).slice(0, 4);
      const temp = this.playerGameList;

      for (let i = temp.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [temp[i], temp[j]] = [temp[j], temp[i]];
      }

      this.team1 = temp.slice(0, 2);
      this.team2 = temp.slice(2, 4);
      this.isStart = true;
      } else {
        alert('Please add another Player');
      }
    }
    else if (field === 'End') {
      if(this.team1Score != null && this.team2Score != null){
        this.isStart = false;
      } else {
        alert('Please input score!');
      }

    }
    else if (field === 'AddPlayer') {
      if (!this.playerNames.trim()) {
        alert('Please enter a player name!');
        return;
      }

      this.count += 1;
      this.playerdetails.Num = this.count;
      this.playerdetails.PlayerName = this.playerNames.trim();
      this.playerdetails.Status = 'Waiting';
      this.playerList.push({ ...this.playerdetails });

      this.playerdetails = {
        Num: 0,
        PlayerName: '',
        Game: 0,
        Wins: 0,
        Lose: 0,
        Status: ''
      };

      this.playerNames = '';
      console.log('Player list:', this.playerList);
    }
  }
}
