import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  // paises: any[] = [];

  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  mensageError: string;

  constructor(
    // private http: HttpClient
    private spotify: SpotifyService
  ) {
    // this.http.get('https://restcountries.eu/rest/v2/lang/es')
    // .subscribe( ( data: any ) => {
    //   this.paises = data;
    //   console.log(this.paises);
    // });

    this.loading = true;

    this.spotify.getNewReleases()
        .subscribe( (data: any) => {
          // console.log(data.albums.items); // sin map
          // this.nuevasCanciones = data.albums.items;
          console.log(data);
          this.nuevasCanciones = data;
          this.loading = false;
        }, ( errorService ) => {
          this.loading = false;
          this.error = true;
          this.mensageError = errorService.error.error.message;
        });
  }

}
