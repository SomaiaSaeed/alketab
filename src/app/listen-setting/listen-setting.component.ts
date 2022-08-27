import { Component, OnInit } from '@angular/core';
import {Search} from '../holy-quran/search';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-listen-setting',
  templateUrl: './listen-setting.component.html',
  // styleUrls: ['./listen-setting.component.scss']
})
export class ListenSettingComponent implements OnInit {

  soar: any[] = [
    {name: 'التصنيف', code: '1'},

    {name: 'السور', code: '2'},
    {name: 'الجزء', code: '3'},

  ];
  soras: any[] = [];
  rob: any[] = [];
  hezb: any[] = [];
  fromSoraAyat: any[] = [];
  toSoraAyat: any[] = [];
  pages: any[] = [];
  result: any[] = [];
  omomQuraan: boolean = false;
  soraSelected: boolean = false;
  partSelected: boolean = false;
  parts: any[] = [];
  fromSora: any = {};
  toSora: any = {};
  fromPart: any = {};
  toPart: any = {};
  fromAya: any = {};
  toAya: any = {};
  fromRob: any = {};
  toRob: any = {};
  fromHezp: any = {};
  toHezp: any = {};
  fromPage: any = {};
  toPage: any = {};
  _search: Search = new Search();
  texts: string[];
  results: string[];
  currentIndex: number;
  repeated: boolean;

  constructor(private router: Router,private http: HttpClient) {
  }

  ngOnInit() {
    this.parts=[];
    this.texts = [];
    this.soras.push({اسم_السورة: '.', nOfAyas: 0});
    let currentSura = 'الفاتحة';
    let nOfAyas = 0;
    this._search.table_othmani.forEach(aya => {
      if (currentSura == aya.Sura_Name) {
        nOfAyas++;
      } else {
        this.soras.push({
          اسم_السورة: currentSura,
          nOFSura: (parseInt(aya.nOFSura) - 1).toString(),
          nOfAyas: nOfAyas
        });
        currentSura = aya.Sura_Name;
        nOfAyas = 1;
      }
    });
    this.parts.push({الجزء: '.'});
    this._search.table_othmani.forEach(aya => {

      let index = this.parts.findIndex(sura => {
        return aya.nOFJoz == sura.الجزء;
      });

      if (index < 0) {
        this.parts.push({
          الجزء: aya.nOFJoz,

        });
      }
    });
    this.hezb.push({nOFHezb: '.'});
    this._search.table_othmani.forEach(aya => {

      let index = this.hezb.findIndex(sura => {
        return aya.nOFHezb == sura.nOFHezb;
      });

      if (index < 0) {
        this.hezb.push({
          nOFHezb: aya.nOFHezb,

        });
      }
    });
    this.pages.push({
      nOFPage: '.',
    });
    this._search.table_othmani.forEach(aya => {

      let index = this.pages.findIndex(sura => {
        return aya.nOFPage == sura.nOFPage;
      });

      if (index < 0) {
        this.pages.push({
          nOFPage: aya.nOFPage,

        });
      }
    });
    this.rob.push({
      rub: '.',

    });
    this._search.table_othmani.forEach(aya => {

      let index = this.rob.findIndex(sura => {
        return aya.rub == sura.rub;
      });

      if (index < 0) {
        this.rob.push({
          rub: aya.rub,
          ayaId: aya.id,
        });
      }
    });
    this.fromSoraAyat = [];
    this.toSoraAyat = [];
    this.toSoraAyat.push({id: '.'});
    this.fromSoraAyat.push({id: '.'});
  }

  omomClicked($event: MouseEvent) {
    this.omomQuraan = true;
  }
  ayaId =5;
  roow:any;
  audioCount:number;

sorats:any[]=[];

  toSoraFun($event: any) {
    this.toSora = $event.value.nOFSura;

    if (this.toSora) {
      this.parts = [];
      this.hezb = [];
      this.pages = [];
      this.rob = [];
      this.toSoraAyat = [];


      this.parts.push({الجزء: '.'});
      this.hezb.push({nOFHezb: '.'});
      this.rob.push({rub: '.'});
      this.pages.push({nOFPage: '.'});
      this.toSoraAyat.push({id: '.'});

      this._search.table_othmani.forEach(aya => {

        if (parseInt(aya.nOFSura) <= parseInt(this.toSora) && parseInt(aya.nOFSura) >= parseInt(this.fromSora)) {
          let index = this.parts.findIndex(sura => {
            return aya.nOFJoz == sura.الجزء;
          });

          if (index < 0) {
            this.parts.push({
              الجزء: aya.nOFJoz,

            });
          }

          index = this.hezb.findIndex(sura => {
            return aya.nOFHezb == sura.nOFHezb;
          });

          if (index < 0) {
            this.hezb.push({
              nOFHezb: aya.nOFHezb,

            });
          }

          index = this.pages.findIndex(sura => {
            return aya.nOFPage == sura.nOFPage;
          });

          if (index < 0) {
            this.pages.push({
              nOFPage: aya.nOFPage,

            });
          }

          index = this.rob.findIndex(sura => {
            return aya.rub == sura.rub;
          });

          if (index < 0) {
            this.rob.push({
              rub: aya.rub,
              ayaId: aya.id,
            });
          }

        }

      });
    }
    let nOfAyas = $event.value.nOfAyas;
    let index = 0;
    while (index < nOfAyas) {
      index++;
      this.toSoraAyat.push({
        id: index,
      });
    }
    // this.result.push(this.toSora);

  }

  fromSoraFun($event: any) {
    debugger
    this.sorats=[];
    let url ="http://api.alquran.cloud/v1/surah/"+$event.value.nOFSura;
    this.http.get<any>(url  ).subscribe(res => {
      this.audioCount = res.data.ayahs.length;
      res.data.ayahs.forEach((aya)=>{
        this.roow='http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/'+ aya.number;
        this.sorats.push(this.roow);
        console.log(res);
      });
    });
    this.fromSora = $event.value.nOFSura;


    this.fromSoraAyat = [];
    this.fromSoraAyat.push({id: '.'});
    let nOfAyas = $event.value.nOfAyas;
    let index = 0;
    while (index < nOfAyas) {
      index++;
      this.fromSoraAyat.push({
        id: index,
      });
    }

  }

  fromAyaFun($event: any) {
    debugger
    this.fromAya = $event.value.id;
  }
ayat:any[]=[]
  toAyaFun($event: any) {
    debugger
    this.sorats=[]
    this.ayat=[]

    this.toAya = $event.value.id;
    for(this.fromAya;this.fromAya<this.toAya;this.fromAya++) {
      this.ayat.push(this.fromAya);
    }
    this.audioCount=this.ayat.length;
    this.ayat.forEach((aya)=>{
      this.roow='http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/'+ aya;
      this.sorats.push(this.roow);
    });
    }

  fromRobFun($event: any) {
    this.fromRob = $event.value.ayaId;
    let url ="https://api.quran.com/api/v4/quran/verses/uthmani_simple?rub_number="+ $event.value.ayaId;
    this.http.get<any>(url  ).subscribe(res => {
      this.audioCount = res.verses.length;
      res.verses.forEach((aya)=>{
        this.roow='http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/'+ aya.id;
        this.sorats.push(this.roow);
        console.log(res);
      });
    });

  }

  toRobFun($event: any) {
    this.toRob = $event.value.ayaId;
    for(this.fromRob++;this.fromRob<this.toRob;this.fromRob++) {
      let url ="http://api.quran.com/api/v4/quran/verses/uthmani_simple?rub_number="+ this.fromRob;

      this.http.get<any>(url  ).subscribe(res => {
        this.audioCount = res.verses.length;
        res.verses.forEach((aya)=>{
          this.roow='http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/'+ aya.id;
          this.sorats.push(this.roow);
          console.log(res);
        });
      });
    }

  }

  fromHezpFun($event: any) {
    this.fromHezp = $event.value.nOFHezb;
    let url ="https://api.quran.com/api/v4/quran/verses/uthmani_simple?hizb_number="+ $event.value.nOFHezb;

    this.http.get<any>(url  ).subscribe(res => {
      this.audioCount = res.verses.length;
      res.verses.forEach((aya)=>{
        this.roow='http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/'+ aya.id;
        this.sorats.push(this.roow);
        console.log(res);
      });
    });
  }

  toHezpFun($event: any) {
    this.toHezp = $event.value.nOFHezb;
    for(this.fromHezp++;this.fromHezp<this.toHezp;this.fromHezp++) {
      let url ="http://api.quran.com/api/v4/quran/verses/uthmani_simple?hizb_number="+ this.fromHezp;

      this.http.get<any>(url  ).subscribe(res => {
        this.audioCount = res.verses.length;
        res.verses.forEach((aya)=>{
          this.roow='http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/'+ aya.id;
          this.sorats.push(this.roow);
          console.log(res);
        });
      });
    }
  }

  fromPageFun($event: any) {
    debugger
    this.fromPage = $event.value.nOFPage;
    this.fromPart = $event.value.الجزء;
    let url ="http://api.quran.com/api/v4/quran/verses/uthmani_simple?page_number="+ $event.value.nOFPage;

    this.http.get<any>(url  ).subscribe(res => {
      this.audioCount = res.verses.length;
      res.verses.forEach((aya)=>{
        this.roow='http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/'+ aya.id;
        this.sorats.push(this.roow);
        console.log(res);
      });
    });
  }

  toPageFun($event: any) {
    this.toPage = $event.value.nOFPage;
    this.fromPart = $event.value.الجزء;
    for(this.fromPage++;this.fromPage<this.toPage;this.fromPage++) {
      let url ="http://api.quran.com/api/v4/quran/verses/uthmani_simple?page_number="+ this.fromPage;

      this.http.get<any>(url  ).subscribe(res => {
        this.audioCount = res.verses.length;
        res.verses.forEach((aya)=>{
          this.roow='http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/'+ aya.id;
          this.sorats.push(this.roow);
          console.log(res);
        });
      });
    }

  }

  fromPartFun($event: any) {
    this.fromPart = $event.value.الجزء;
    let url ="http://api.alquran.cloud/v1/juz/"+ $event.value.الجزء;
      this.http.get<any>(url  ).subscribe(res => {
      this.audioCount = res.data.ayahs.length;
      res.data.ayahs.forEach((aya)=>{
        this.roow='http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/'+ aya.number;
        this.sorats.push(this.roow);
        console.log(res);
      });
    });

  }

  toPartFun($event: any) {
    this.toPart = $event.value.الجزء;
    for(this.fromPart++;this.fromPart<this.toPart;this.fromPart++) {
      let url ="http://api.alquran.cloud/v1/juz/"+ this.fromPart;

      this.http.get<any>(url  ).subscribe(res => {
        this.audioCount = res.verses.length;
        res.verses.forEach((aya)=>{
          this.roow='http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/'+ aya.id;
          this.sorats.push(this.roow);
          console.log(res);
        });
      });
    }
  }

  audio: any;

numberOfRepeated:number;
  wasatClicked($event: MouseEvent) {
    this.repeated = true;
    this.numberOfRepeated=3;
  }

  onChange($event: any) {

    this.texts.push($event);
  }
played:boolean;
  audioEnded(ayaNum){
    debugger
    if(ayaNum<this.audioCount-1){
      this.currentIndex = ayaNum+1;
      this.playNextAya(this.currentIndex );
    }
    if(ayaNum==this.audioCount-1&&this.repeated){
      let audio:any = document.getElementById("surahPlayer0");
      audio.play();
    }
  }


  playNextAya(ayaNum){
    debugger
    let currentAudio:any = document.getElementById("surahPlayer"+ayaNum);
    currentAudio.play();
  }

  onPlay(ayaNum: number) {
    debugger
    if(ayaNum != this.currentIndex+1){// handle manual play
      for(let i=0;i<this.audioCount;i++){
        if(i!=ayaNum){
          let audio:any = document.getElementById("surahPlayer"+i);
          audio.pause();
          audio.currentTime = 0;
        }
      }
    }
  }
}
