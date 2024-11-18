import { Observable, ObservableArray } from '@nativescript/core';
import { TeamDrawService, Match } from './services/team-draw.service';

export class MainViewModel extends Observable {
    private _playerCount: string = "";
    private _matches: ObservableArray<Match>;
    private teamDrawService: TeamDrawService;

    constructor() {
        super();
        this._matches = new ObservableArray<Match>();
        this.teamDrawService = new TeamDrawService();
    }

    get playerCount(): string {
        return this._playerCount;
    }

    set playerCount(value: string) {
        if (this._playerCount !== value) {
            this._playerCount = value;
            this.notifyPropertyChange('playerCount', value);
        }
    }

    get matches(): ObservableArray<Match> {
        return this._matches;
    }

    onReset() {
        this.playerCount = "";
        this._matches.splice(0);
        this.notifyPropertyChange('matches', this._matches);
    }

    onDraw() {
        try {
            const count = parseInt(this.playerCount);
            
            if (isNaN(count) || count < 4 || count > 99) {
                this._matches.splice(0);
                this._matches.push({
                    matchNumber: 1,
                    matchText: "Le nombre de joueurs doit être entre 4 et 99"
                });
            } else {
                const matches = this.teamDrawService.generateMatches(count);
                this._matches.splice(0);
                matches.forEach(match => this._matches.push(match));
            }
            
            this.notifyPropertyChange('matches', this._matches);
        } catch (error) {
            console.error('Erreur lors du tirage:', error);
            this._matches.splice(0);
            this._matches.push({
                matchNumber: 1,
                matchText: "Une erreur est survenue lors du tirage"
            });
            this.notifyPropertyChange('matches', this._matches);
        }
    }
}