import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  TOKEN = 'Bearer BQBTOU1Kha10C22I6jlaOv62BxGlfpoemjQMXcvp1_qM-AS2t2ghDMOtC-ttCxbP7nki-AV1mztQNVaS9dA';

  constructor(
    private http: HttpClient
  ) { }

  getQuery( query: string ) {
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {

    // const headers = new HttpHeaders({
    //   'Authorization': this.TOKEN
    // });

    // this.http.get('https://api.spotify.com/v1/browse/new-releases', { headers })
    // .subscribe( data => {
    //   console.log(data);
    // });

    // return this.http.get('https://api.spotify.com/v1/browse/new-releases', { headers })
    // .pipe( map( data => data['albums'].items ));
    // .pipe( map( data => {
    //   return data['albums'].items;
    // }));

    return this.getQuery('browse/new-releases')
              .pipe( map( data => data['albums'].items ));
  }

  getArtistas(termino: string) {

    // const headers = new HttpHeaders({
    //   'Authorization': this.TOKEN
    // });

    // return this.http.get(`https://api.spotify.com/v1/search?q=${ termino }&type=artist&limit=15`, { headers })
    // .pipe( map( data => {
    //   return data['artists'].items;
    // }));
    // .pipe( map( data => data['artists'].items ));
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
              .pipe( map( data => data['artists'].items ));
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${ id }`);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${ id }/top-tracks?country=ES`)
                .pipe( map( data => data['tracks'] ));
  }
}
