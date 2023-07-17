import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Search } from '../holy-quran/search';
import { AutoComplete } from 'primeng/autocomplete';
import { HttpClient } from '@angular/common/http';

const SHADDA_FATHA = 1611;
const FATHATAN = 1613;// Tanween fatha
const FATHA = 1614;
const DAMMA = 1615;
const KASRA = 1616;
const SHADDA = 1617;
const SUKUN = 1618;
const SMALL_ALEF = 1648;
const GWAZ_ALWASL_ALWAQF = 1754;// ۚ
const GWAZ_ALWASL = 1750;// ۖ
const HAMZAT_WASL = 1649;//ٱ
const TashkeelRegex = /[\u064B-\u0653]|[\u06E2]|[\u06DF-\u06ED]/g; //  /[\u064B-\u0652]/g
const HAMZATWASL = /[\u0671]/g;
const SMALLALEF = /[\u0670]/g;
const searchURL = "assets/jsonData/searchJson.json";
const ARABIC_CHARS_REG = /[\u0621-\u064A\s]+/g;
const regex = /([\u0600-\u06FF])ِى/g; // to replace any arabic character followed by this char ِ and (ى) with (ي) 
                                    // for example replace this (فِى سَبِيلِى)  with this (في سَبِيلي)  

@Component({
  selector: 'app-rootpage',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  providers: [Search]

})
export class RootComponent implements OnInit {

  results: string[];
  searchWord: string;
  hasTashkeel: boolean = false;
  searchInOptions = [
    { name: 'عموم القران', id: 1 },
    { name: 'بداية الايات', id: 2 },
  ];
  searchIn = { name: 'بداية الايات', id: 2 };
  ayas: any[] = [];
  searchSettings: any;
  searchInput: string;
  showListOfAyah: boolean = false;
  currentLength: number = 0;
  numOfMoade3: number = 0;
  fromSora: number;
  toSora: number;
  fromPart: number;
  toPart: number;
  fromHezp: number;
  toHezp: number;
  fromRob: number;
  toRob: number;
  fromPage: number;
  toPage: number;
  fromAya: number;
  toAya: number;
  @ViewChild('autoComplete', { static: false })
  autoComplete: AutoComplete;
  omomQuaanBoolean: boolean = false;
  isSameWord: boolean = false;
  alphabitcalOrder: boolean = false;

  constructor(private _router: Router, private _http: HttpClient) {
  }

  ngOnInit() {
    this.callMotashabh();
    // this.testSearchWithTaskeel();
  }

  callReader($event: MouseEvent) {
    this._router.navigateByUrl("/qoraa");

  }

  callFehres($event: MouseEvent) {
    this._router.navigateByUrl("/listen");
  }

  callTafser($event: MouseEvent) {

    this._router.navigateByUrl("/readers");

  }

  callSearch($event: MouseEvent) {
    this._router.navigateByUrl("/search");

  }

  callMotashabh() {
    this._router.navigateByUrl("");
  }

  callHome($event: MouseEvent) {
    this._router.navigateByUrl("/home");

  }

  search(event) {
    if (event != "oldSearch") {
      this.searchWord = event.query;
      this.results = [];
      // debugger
      // var word = event.query.replace(regex, '$1ي');
      // word = word.replace('ٱ', "ا");
      // word = word.replace( 'ٰ', "ا");//replace small Alef to Alef
      // word = word.replace( HAMZATWASL_AMALLALEFRegex, "ا");//replace small Alef to Alef
      // word = word.replace( 'ءا', "آ");//replace small Alef to Alef
      // word = word.replace( "ذالك", "ذلك");//replace small Alef to Alef
      // word = word.replace( "أولائك", "أولئك");//replace small Alef to Alef
      // word = word.replace( "لاكن", "لكن");//replace small Alef to Alef
      // word = word.replace( "ٱلَّيْلِ", "الليل");
      // word = word.replace( "علىا", "على");//replace small Alef to Alef
      // const match = word.match(ARABIC_CHARS_REG);
      //  word = match && match.join('').trim();
    
      // var word = this.searchWord.replace(TashkeelRegex, "");

      // debugger
      let word = event.query;
      word = this.applyTaskeelRegex(word)

      //  let harakat = String.fromCharCode(SHADDA, 124, FATHA, 124, SHADDA_FATHA, 124,
      //   DAMMA, 124, KASRA, 124, FATHATAN, 124,
      //   SUKUN, 124, GWAZ_ALWASL_ALWAQF,
      //   124, GWAZ_ALWASL);
      // let word = event.query.replace(new RegExp(harakat, "g"), "");
      // word = word.replace("ٱ", "ا");
      // word = word.replace("تَٰ", "تا");

      // if (word != event.query) {
      //   this.hasTashkeel = true;
      //   this._search.table_othmani.forEach(aya => {
      //     if (this.searchIn.id == 1) {
      //       if (aya.AyaText_Othmani.includes(event.query)) {
      //         this.results.push(aya.AyaText_Othmani)
      //       }
      //     } else {
      //       if (aya.AyaText_Othmani.startsWith(event.query)) {
      //         this.results.push(aya.AyaText_Othmani)
      //       }
      //     }


      //   });
      // } else {
      // debugger
      this.hasTashkeel = false;
      this._http.get<any>(searchURL).subscribe(response => {
      response.forEach(aya => {
        // let text = aya.AyaText_Othmani.replace(new RegExp(String.fromCharCode(1617, 124, 1614, 124, 1611, 124, 1615, 124, 1612, 124, 1616, 124, 1613, 124, 1618,3161,1552), "g"), "");

        // if (this.searchIn.id == 1) {
        if (aya.AyaText.includes(word)) {
          this.results.push(aya.AyaText_Othmani)
        }
        // } else {
        //   if (aya.AyaText.startsWith(word)) {
        //     this.results.push(aya.AyaText_Othmani)
        //   }
        // }

      });
    });
    }
    // }

  }

  getLocal() {
    if (this.searchWord == '' || this.searchWord == undefined || this.searchWord == null) {
      let finalResult = JSON.parse(localStorage.getItem('oldSearch'));
      if (finalResult) {
        this.autoComplete.filled = true;
        this.autoComplete.loading = true;
        this.results = [];
        this.results = finalResult;
        this.autoComplete.completeMethod.emit('oldSearch');
      }


    }
  }

  doSearch() {
    // debugger;
    this.numOfMoade3 = 0;
    this.saveSearchToLocalStorage();
    this.ayas = [];
    let hasSpace = false;
    // if(this.searchWord.endsWith(' ')){
    //   hasSpace = true;
    // }
    // this.searchWord =this.searchWord.split(' ')[0];
    // });
    let searchWord = this.applyTaskeelRegex(this.searchWord)
   

  
    // this.searchWord = this.searchWord.trim();
    if (localStorage.getItem('result')) {
      this.searchSettings = JSON.parse(localStorage.getItem('result'));
      this.fromSora = this.searchSettings.fromSora && this.searchSettings.fromSora != '.' ? parseInt(this.searchSettings.fromSora) : null;
      this.toSora = this.searchSettings.toSora && this.searchSettings.toSora != '.' ? parseInt(this.searchSettings.toSora) : null;
      this.fromPart = this.searchSettings.fromPart && this.searchSettings.fromPart != '.' ? parseInt(this.searchSettings.fromPart) : null;
      this.toPart = this.searchSettings.toPart && this.searchSettings.toPart != '.' ? parseInt(this.searchSettings.toPart) : null;
      this.fromHezp = this.searchSettings.fromHezp && this.searchSettings.fromHezp != '.' ? parseInt(this.searchSettings.fromHezp) : null;
      this.toHezp = this.searchSettings.toHezp && this.searchSettings.toHezp != '.' ? parseInt(this.searchSettings.toHezp) : null;
      this.fromRob = this.searchSettings.fromRob && this.searchSettings.fromRob != '.' ? parseInt(this.searchSettings.fromRob) : null;
      this.toRob = this.searchSettings.toRob && this.searchSettings.toRob != '.' ? parseInt(this.searchSettings.toRob) : null;
      this.fromPage = this.searchSettings.fromPage && this.searchSettings.fromPage != '.' ? parseInt(this.searchSettings.fromPage) : null;
      this.toPage = this.searchSettings.toPage && this.searchSettings.toPage != '.' ? parseInt(this.searchSettings.toPage) : null;
      this.fromAya = this.searchSettings.fromAya;
      this.toAya = this.searchSettings.toAya;
      this.omomQuaanBoolean = this.searchSettings.omomQuaanBoolean ? this.searchSettings.omomQuaanBoolean : false;
      this.alphabitcalOrder = this.searchSettings.alphabitcalOrder ? this.searchSettings.alphabitcalOrder : false;
    }
    // if (this.hasTashkeel) {
    // this.searchWithTashkeel();
    // } else {
      this.searchWithoutTashkeel(searchWord);
    // }

    if (this.alphabitcalOrder) this.sortAlphabetical();
    // console.log(this.ayas);

    // if (hasSpace) {
    //   let ayas = [];
    //   this.searchWord.replace(' ', '');
    //   this.ayas.forEach(aya => {
    //     if (aya.AyaText) {
    //       let arrOfAyaWords = aya.AyaText.split(' ');
    //       let index = arrOfAyaWords.findIndex(word => word === this.searchWord);
    //       if (index >= 0) {
    //         ayas.push(aya);
    //       }
    //     }
    //
    //     // for(let i=0;i<arrOfAyaWords.length;i++){
    //     //   if(arrOfAyaWords.)
    //     // }
    //
    //   });
    //   this.ayas = ayas;
    //
    // }
    // setTimeout(()=>{

    this.showListOfAyah = true;
    // });
    // this.showListOfAyah = true;

  }
  applyTaskeelRegex(searchWord: string) {

    searchWord = searchWord.replace(regex, '$1ي');
    searchWord = searchWord.replace(/([ء-ي])َىْ/g, '$1ي'); // شَىْءٍ - شيء
    searchWord = searchWord.replace(/سَوَّىٰ([ء-ي]+)/g, 'سَوَّا$1'); // فَسَوَّىٰهُنَّ فسواهن
    searchWord = searchWord.replace('ٱلْحَيَوٰ', "الحيا");
    // searchWord = searchWord.replace('ٱ', "ا");
    searchWord = searchWord.replace( "ـَٔاي", "آي");//replace "بِـَٔايَٰتِنَا" "بآياتنا " 
    searchWord = searchWord.replace( 'ـَٰٔ', "آ");//replace small Alef to Alef ـَٰٔ
    searchWord = searchWord.replace( HAMZATWASL, "ا");//replace small Alef to Alef

    // let exceptionalWords = ["هَٰٓؤُلَآءِ"];
    // if(!exceptionalWords.some(word => searchWord.includes(word))){
    // let regexPattern = new  RegExp(`[\u0670](?!(${exceptionalWords.join('|')}))|[\u0671]$`, 'g');
    searchWord = searchWord.replace(SMALLALEF, "ا");
    // }
    searchWord = searchWord.replace( "الَّيْل", "الليل");
    searchWord = searchWord.replace( /([\u0600-\u06FF])ىا/g, "ى");//replace small Alef to Alef
    searchWord = searchWord.replace( /ـُٔ/g, "ئ");//replace "لَيَـُٔوسٌ"
    searchWord = searchWord.replace( "ـَٔا", "ئا");//replace "يَسْـَٔلُونَكَ" "يسألونك " - "سَيِّـَٔاتِهِمْ " "سيئاتهم "
    searchWord = searchWord.replace( "ـَٔ", "أ");//replace "يَسْـَٔلُونَكَ" "يسألونك " - "يَسْـَٔمُ " "يسأم "
    searchWord = searchWord.replace( "عُمْىٌ", "عمي"); // عُمْىٌ
    searchWord = searchWord.replace( "هُدَاىَ", "هداي"); // 

    
    const match = searchWord.match(ARABIC_CHARS_REG);
    searchWord = match && match.join('').trim();
    searchWord = searchWord.replace( /وىٰ/g, "وا"); // ياأيها
    searchWord = searchWord.replace(/ءا/g, 'آ');// آمن
    // searchWord = searchWord.replace( 'ءا', "آ");//replace small Alef to Alef 
    searchWord = searchWord.replace( /ذالك/g, "ذلك");//replace small Alef to Alef
    searchWord = searchWord.replace( /أولائك/g, "أولئك");//replace small Alef to Alef
    searchWord = searchWord.replace( /لاكن/g, "لكن");//replace small Alef to Alef
    searchWord = searchWord.replace( /الرحمان/g, "الرحمن");
    searchWord = searchWord.replace( /الصلواة/g, "الصلاة");
    searchWord = searchWord.replace( /ءأ/g, "أأ"); // أأنذرتهم
    searchWord = searchWord.replace( /الءا/g, "الآ"); // الآخر
    searchWord = searchWord.replace( /مستهزءون/g, "مستهزئون"); // مستهزءون
    searchWord = searchWord.replace( /ياأيها/g, "يا أيها"); // ياأيها
    searchWord = searchWord.replace( /هاذ/g, "هذ"); 
    searchWord = searchWord.replace( /هاؤلاء/g, "هؤلاء"); 
    searchWord = searchWord.replace( /يستحى/g, "يستحيي"); 
    searchWord = searchWord.replace( /يائادم/g, "يا آدم");
    searchWord = searchWord.replace( "يابني", "يا بني"); // 
    searchWord = searchWord.replace( "ياقوم", "يا قوم"); // 
    searchWord = searchWord.replace( "ياموسى", "يا موسى"); // 

    // searchWord = searchWord.replace(/\b(\S*يا\S*)\b/g, "يا $1");

    searchWord = searchWord.replace( "وإياى", "وإياي"); // 
    searchWord = searchWord.replace( "إسراءيل", "إسرائيل"); // 
    searchWord = searchWord.replace( "الزكواة", "الزكاة"); // 
    searchWord = searchWord.replace( "ملاقوا", "ملاقو"); // 
    searchWord = searchWord.replace( "شيـا", "شيئا"); // 
    searchWord = searchWord.replace( "باءو", "باءوا"); // 
    searchWord = searchWord.replace( "النبين", "النبيين"); // 
    searchWord = searchWord.replace( "والصابـين", "والصابئين"); // 
    searchWord = searchWord.replace( "خاسـين", "خاسئين"); // 
    searchWord = searchWord.replace( "فاداراتم", "فادارأتم"); // 
    searchWord = searchWord.replace( "يحى", "يحيي"); // ؟؟؟؟
    searchWord = searchWord.replace( "خطيأته", "خطيئته"); // 
    searchWord = searchWord.replace( "خزى", "خزي"); // 
    searchWord = searchWord.replace( "حيواة", "حياة"); // 
    searchWord = searchWord.replace( "ميكىل", "ميكال"); // 
    searchWord = searchWord.replace( "تتلوا", "تتلو"); // 
    searchWord = searchWord.replace( "يتلوا", "يتلو"); // 
    searchWord = searchWord.replace( "اشترىه", "اشتراه"); // 
    searchWord = searchWord.replace(  /إبراهم/g, "إبراهيم"); //
    searchWord = searchWord.replace(/([\u0600-\u06FF]|)وإلاه(|[\u0600-\u06FF])/g, "وإله"); //     
    searchWord = searchWord.replace(/([\u0600-\u06FF]|)إلاه(|[\u0600-\u06FF])/g, "إله"); //     
    searchWord = searchWord.replace(/([\u0600-\u06FF]&&)ى(&&[\u0600-\u06FF])/g, ""); //     

    
    
    

    
    // searchWord = searchWord.replace(TashkeelRegex, '');// remove Tashkeel
    return searchWord;
  }

  highlightSearchWord(aya: { AyaText_Othmani: string;AyaText :string; Aya_N: string; },searchWord) {
   debugger
    let splittedAya = [];
    let highlightedAya = [];
    let len: number;
    let start: number = -1;
    let end: number = -1;

    let ayaTextArr = aya.AyaText.split(' ');
    for(let a=0; a<ayaTextArr.length; a++) {
      if(searchWord.includes(ayaTextArr[a])) {
        if(searchWord.split(' ').length == 1) {start=end=a; break;}
        if(start == -1 && a+1<ayaTextArr.length && searchWord.includes(ayaTextArr[a+1])) start = a;
        if(a>=ayaTextArr.length||(a+1<ayaTextArr.length && searchWord.includes(ayaTextArr[a-1]) && !searchWord.includes(ayaTextArr[a+1]))) end = a;
      }
    }

    splittedAya = aya.AyaText_Othmani.split(' ');
    for(let b=0; b<ayaTextArr.length; b++) {
     highlightedAya.push({ text: splittedAya[b], highlight: start <= b&&end >= b });


    }
    // debugger
    // len = splittedAya.length;
    // for (let i = 0; i < len; i++) {
    //   if (splittedAya[i] != '') highlightedAya.push({ text: splittedAya[i], highlight: false });
    //   if (i != len - 1) {
    //     this.numOfMoade3++;
    //     highlightedAya.push({ text: this.searchWord, highlight: true });
    //   }
    // }
    // highlightedAya[highlightedAya.length-1].text += ' ('+ aya.Aya_N+')';

    // } else { //without tashkeel
    //   splittdAya = aya.AyaText.split(this.searchWord);
    //   len = splittdAya.length;
    //   for (let i = 0; i < len; i++) {
    //     if (splittdAya[i] != '') highlightedAya.push({ text: splittdAya[i], highlight: false });
    //     if (i != len - 1) {
    //       this.numOfMoade3++;
    //       highlightedAya.push({ text: this.searchWord, highlight: true });
    //     }
    //   }
    //   // highlightedAya[highlightedAya.length-1].text += ' ('+ aya.Aya_N+')';
    // }
    // highlightedAya.push({ text: ' (' + aya.Aya_N + ')', highlight: false });
    return highlightedAya;
  }


  changeSearchInput(value) {

    this.currentLength = value.length;
    this.searchInput = value;
  }

  searchWithTashkeel() {
    this._http.get<any>(searchURL).subscribe(response => {

    response.forEach(aya => {
      if (this.fromSora && this.toSora) {
        this.searchFromSoraToSora(aya);
      } else if (this.fromPart && this.toPart) {
        if (aya.nOFJoz >= this.fromPart && aya.nOFJoz <= this.toPart) {

          this.completeSearch(aya);
        }
      } else if (this.fromHezp && this.toHezp) {
        if (aya.nOFHezb >= this.fromHezp && aya.nOFHezb <= this.toHezp) {

          this.completeSearch(aya);
        }
      } else if (this.fromRob && this.toRob) {
        if (aya.id >= this.fromRob && aya.id <= this.toRob) {

          this.completeSearch(aya);
        }
      } else if (this.fromPage && this.toPage) {
        if (aya.nOFPage >= this.fromPage && aya.nOFPage <= this.toPage) {

          this.completeSearch(aya);
        }
      } else {
        this.completeSearch(aya);

      }
    });
  });

    // this.checkSameWordWithTaskeel();
  }

  searchWithoutTashkeel(searchWord:string) {

    this._http.get<any>(searchURL).subscribe(response => {

      response.forEach(aya => {
      if (this.fromSora && this.toSora) {
        if (aya.nOFSura >= this.fromSora && aya.nOFSura <= this.toSora) {

          this.completeSearchWithoutTashkeel(aya,searchWord)
        }
      } else if (this.fromPart && this.toPart) {
        if (aya.nOFJoz >= this.fromPart && aya.nOFJoz <= this.toPart) {
          this.completeSearchWithoutTashkeel(aya,searchWord)

        }
      } else if (this.fromHezp && this.toHezp) {
        if (aya.nOFHezb >= this.fromHezp && aya.nOFHezb <= this.toHezp) {

          this.completeSearchWithoutTashkeel(aya,searchWord)

        }
      } else if (this.fromRob && this.toRob) {
        if (aya.id >= this.fromRob && aya.id <= this.toRob) {

          this.completeSearchWithoutTashkeel(aya,this.searchWord)

        }
      } else if (this.fromPage && this.toPage) {
        if (aya.nOFPage >= this.fromPage && aya.nOFPage <= this.toPage) {
          this.completeSearchWithoutTashkeel(aya,searchWord)

        }
      } else {
        this.completeSearchWithoutTashkeel(aya,searchWord)

      }
    });
    this.checkSameWordWithOutTaskeel(searchWord);
  });  
  }

  checkSameWordWithTaskeel(searchWord) {
    if (this.isSameWord == true && !searchWord.includes(' ')) {
      let ayat = [];
      this.numOfMoade3 = 0;
      this.ayas.forEach(aya => {

        let words = aya.AyaText_Othmani.split(' ');
        words.forEach(word => {
          if (word == searchWord) {
            ayat.push({
              رقم_السورة: aya.nOFSura,
              بداية_السورة: aya.بداية_السورة,
              الربع: aya.rub,
              الجزء: aya.رقم_الجزء,
              رقم_الجزء: aya.nOFJoz,
              الحزب: aya.hezb,
              رقم_الحزب: aya.رقم_الحزب,
              رقم_الصفحة: aya.رقم_الصفحة,
              بداية_الربع: aya.rubStart,
              بداية_الصفحة: aya.pageStart,
              اسم_السورة: aya.اسم_السورة,
              الآية: aya.AyaText_Othmani + ' (' + aya.Aya_N + ')',
              AyaText: aya.AyaText,
              AyaText_Othmani: aya.AyaText_Othmani,
              Aya_N: aya.Aya_N,
              highlightedAya: this.highlightSearchWord(aya,searchWord)
            });
          }
        });
      });
      this.ayas = ayat;
    }

  }

  checkSameWordWithOutTaskeel(searchWord) {
    // debugger;
    if (this.isSameWord == true) {
      let ayat = [];
      let last_word;
      if (!searchWord.includes(' ')) {// just one word
        last_word = searchWord;
      } else {// multi words
        let words = searchWord.split(' ');
        last_word = words[words.length - 1]
      }
      this.numOfMoade3 = 0;
      this.ayas.forEach(aya => {

        let words = aya.AyaText.split(' ');
        words.forEach(word => {
          if (word == last_word) {
            ayat.push({
              رقم_السورة: aya.nOFSura,
              بداية_السورة: aya.بداية_السورة,
              الربع: aya.rub,
              الجزء: aya.رقم_الجزء,
              رقم_الجزء: aya.nOFJoz,
              الحزب: aya.hezb,
              رقم_الحزب: aya.رقم_الحزب,
              رقم_الصفحة: aya.رقم_الصفحة,
              بداية_الربع: aya.rubStart,
              بداية_الصفحة: aya.pageStart,
              اسم_السورة: aya.اسم_السورة,
              الآية: aya.AyaText_Othmani + ' (' + aya.Aya_N + ')',
              AyaText: aya.AyaText,
              AyaText_Othmani: aya.AyaText_Othmani,
              Aya_N: aya.Aya_N,
              highlightedAya: this.highlightSearchWord(aya,searchWord)
            });
          }
        });
      });
      this.ayas = ayat;
    }

  }

  sortAlphabetical() {

    this.ayas.sort(function (a, b) {
      return a.AyaText_Othmani.localeCompare(b.AyaText_Othmani, ["ar"]);
    });
  }

  searchInOmomAlQuran(aya,searchWord) {

    if (aya.AyaText.includes(searchWord)) {
      this.ayas.push({
        رقم_السورة: aya.nOFSura,
        بداية_السورة: aya.suraStart,
        الربع: aya.rub,
        الجزء: aya.joz,
        رقم_الجزء: aya.nOFJoz,
        الحزب: aya.hezb,
        رقم_الحزب: aya.nOFHezb,
        رقم_الصفحة: aya.nOFPage,
        بداية_الربع: aya.rubStart,
        بداية_الصفحة: aya.pageStart,
        اسم_السورة: aya.Sura_Name,
        الآية: aya.AyaText_Othmani + ' (' + aya.Aya_N + ')',
        AyaText: aya.AyaText,
        AyaText_Othmani: aya.AyaText_Othmani,
        Aya_N: aya.Aya_N,
        highlightedAya: this.highlightSearchWord(aya,searchWord)
      });
    }

  }

  searchInAyaStart(aya: any,searchWord) {

    if (aya.AyaText.startsWith(searchWord)) {
      this.ayas.push({
        رقم_السورة: aya.nOFSura,
        بداية_السورة: aya.suraStart,
        الربع: aya.rub,
        الجزء: aya.joz,
        رقم_الجزء: aya.nOFJoz,
        الحزب: aya.hezb,
        رقم_الحزب: aya.nOFHezb,
        رقم_الصفحة: aya.nOFPage,
        بداية_الربع: aya.rubStart,
        بداية_الصفحة: aya.pageStart,
        اسم_السورة: aya.Sura_Name,
        الآية: aya.AyaText_Othmani + ' (' + aya.Aya_N + ')',
        AyaText: aya.AyaText,
        AyaText_Othmani: aya.AyaText_Othmani,
        Aya_N: aya.Aya_N,
        highlightedAya: this.highlightSearchWord(aya,searchWord)
      });
    }

  }

  searchFromSoraToSora(aya) {

    if (aya.nOFSura >= this.fromSora && aya.nOFSura <= this.toSora) {

      if (this.fromPart && this.toPart) {
        if (aya.nOFJoz >= this.fromPart && aya.nOFJoz <= this.toPart) {

          this.completeSearch(aya);
        }
      } else {
        this.completeSearch(aya);
      }
      // else if(this.fromHezp && this.toHezp){
      //   if(aya.nOFHezb>=this.fromHezp && aya.nOFHezb<= this.toHezp) {
      //
      //     if (this.omomQuaanBoolean) {
      //       this.searchInOmomAlQuran(aya);
      //     }
      //     else {
      //       this.searchInAyaStart(aya);
      //     }
      //   }
      // }
      // else if(this.fromRob && this.toRob){
      //   if(aya.id>=this.fromRob && aya.id<= this.toRob) {
      //
      //     if (this.omomQuaanBoolean) {
      //       this.searchInOmomAlQuran(aya);
      //     }
      //     else {
      //       this.searchInAyaStart(aya);
      //     }
      //   }
      // }
      // else if(this.fromPage && this.toPage){
      //   if(aya.nOFPage>=this.fromPage && aya.nOFPage<= this.toPage) {
      //
      //     if (this.omomQuaanBoolean) {
      //       this.searchInOmomAlQuran(aya);
      //     }
      //     else {
      //       this.searchInAyaStart(aya);
      //     }
      //   }
      // }


    }

  }

  completeSearch(aya) {
    // if (this.omomQuaanBoolean) {
    //   this.searchInOmomAlQuran(aya,searchWord);
    // } else {
    //   this.searchInAyaStart(aya,searchWord);
    // }
  }

  completeSearchWithoutTashkeel(aya,searchWord) {
    if (this.omomQuaanBoolean) {
      this.searchInOmomAlQuranWithoutTashkeel(aya,searchWord);
    } else {
      this.searchInAyaStartWithoutTashkeel(aya,searchWord);
    }
  }

  searchInOmomAlQuranWithoutTashkeel(aya: any,searchWord) {
    if (aya.AyaText.includes(searchWord)) {
      //
      // debugger;
      this.ayas.push({
        رقم_السورة: aya.nOFSura,
        بداية_السورة: aya.suraStart,
        الربع: aya.rub,
        الجزء: aya.joz,
        رقم_الجزء: aya.nOFJoz,
        الحزب: aya.hezb,
        رقم_الحزب: aya.nOFHezb,
        رقم_الصفحة: aya.nOFPage,
        بداية_الربع: aya.rubStart,
        بداية_الصفحة: aya.pageStart,
        اسم_السورة: aya.Sura_Name,
        الآية: aya.AyaText_Othmani + ' (' + aya.Aya_N + ')',
        AyaText: aya.AyaText,
        AyaText_Othmani: aya.AyaText_Othmani,
        Aya_N: aya.Aya_N,
        highlightedAya: this.highlightSearchWord(aya,searchWord)
      });
    }
  }

  searchInAyaStartWithoutTashkeel(aya: any,searchWord) {
    if (aya.AyaText.startsWith(searchWord)) {
      this.ayas.push({
        رقم_السورة: aya.nOFSura,
        بداية_السورة: aya.suraStart,
        الربع: aya.rub,
        الجزء: aya.joz,
        رقم_الجزء: aya.nOFJoz,
        الحزب: aya.hezb,
        رقم_الحزب: aya.nOFHezb,
        رقم_الصفحة: aya.nOFPage,
        بداية_الربع: aya.rubStart,
        بداية_الصفحة: aya.pageStart,
        اسم_السورة: aya.Sura_Name,
        الآية: aya.AyaText_Othmani + ' (' + aya.Aya_N + ')',
        AyaText: aya.AyaText,
        AyaText_Othmani: aya.AyaText_Othmani,
        Aya_N: aya.Aya_N,
        highlightedAya: this.highlightSearchWord(aya,searchWord)
      });
    }
  }

  selectSearchWords($event: any) {
    let word = this.searchWord.replace(new RegExp(String.fromCharCode(1617, 124, 1614, 124, 1611, 124, 1615, 124, 1612, 124, 1616, 124, 1613, 124, 1618, 3161, 1552), "g"), "");
    this.hasTashkeel = word != this.searchWord;
  }

  saveSearchToLocalStorage() {
    let isSearchFound = false;
    let oldSearch = JSON.parse(localStorage.getItem('oldSearch'));
    if (oldSearch == null) {
      oldSearch = [];
    } else {
      for (let i = 0; i < oldSearch.length; i++) {
        if (oldSearch[i] == this.searchWord) {
          isSearchFound = true;
          break;
        }
      }
    }
    if (!isSearchFound) {
      oldSearch.push(this.searchWord);
      localStorage.setItem('oldSearch', JSON.stringify(oldSearch));
    }

  }

  sameWord($event: MouseEvent) {
    this.isSameWord = !this.isSameWord;
  }

  testSearchWithTaskeel(){
    this._http.get<any>(searchURL).subscribe(response => {
      // debugger;
      for (let i = 0; i < response.length; i++ ){

        this.searchWord = response[i].AyaText_Othmani;
        // this.doSearch();
        // debugger;
        this.numOfMoade3 = 0;
        // this.saveSearchToLocalStorage();
        this.ayas = [];
        let hasSpace = false;
        // if(this.searchWord.endsWith(' ')){
        //   hasSpace = true;
        // }
        // this.searchWord =this.searchWord.split(' ')[0];
        // });
        this.searchWord = this.applyTaskeelRegex(this.searchWord)
       
    
      
        // this.searchWord = this.searchWord.trim();
        if (localStorage.getItem('result')) {
          this.searchSettings = JSON.parse(localStorage.getItem('result'));
          this.fromSora = this.searchSettings.fromSora && this.searchSettings.fromSora != '.' ? parseInt(this.searchSettings.fromSora) : null;
          this.toSora = this.searchSettings.toSora && this.searchSettings.toSora != '.' ? parseInt(this.searchSettings.toSora) : null;
          this.fromPart = this.searchSettings.fromPart && this.searchSettings.fromPart != '.' ? parseInt(this.searchSettings.fromPart) : null;
          this.toPart = this.searchSettings.toPart && this.searchSettings.toPart != '.' ? parseInt(this.searchSettings.toPart) : null;
          this.fromHezp = this.searchSettings.fromHezp && this.searchSettings.fromHezp != '.' ? parseInt(this.searchSettings.fromHezp) : null;
          this.toHezp = this.searchSettings.toHezp && this.searchSettings.toHezp != '.' ? parseInt(this.searchSettings.toHezp) : null;
          this.fromRob = this.searchSettings.fromRob && this.searchSettings.fromRob != '.' ? parseInt(this.searchSettings.fromRob) : null;
          this.toRob = this.searchSettings.toRob && this.searchSettings.toRob != '.' ? parseInt(this.searchSettings.toRob) : null;
          this.fromPage = this.searchSettings.fromPage && this.searchSettings.fromPage != '.' ? parseInt(this.searchSettings.fromPage) : null;
          this.toPage = this.searchSettings.toPage && this.searchSettings.toPage != '.' ? parseInt(this.searchSettings.toPage) : null;
          this.fromAya = this.searchSettings.fromAya;
          this.toAya = this.searchSettings.toAya;
          this.omomQuaanBoolean = this.searchSettings.omomQuaanBoolean ? this.searchSettings.omomQuaanBoolean : false;
          this.alphabitcalOrder = this.searchSettings.alphabitcalOrder ? this.searchSettings.alphabitcalOrder : false;
        }
      

        
    // this._http.get<any>(searchURL).subscribe(response => {

        for (let x = 0; x < response.length; x++ ){

      if (this.fromSora && this.toSora) {
        if (response[x].nOFSura >= this.fromSora && response[x].nOFSura <= this.toSora) {

          this.completeSearchWithoutTashkeel(response[x],this.searchWord)
        }
      } else if (this.fromPart && this.toPart) {
        if (response[x].nOFJoz >= this.fromPart && response[x].nOFJoz <= this.toPart) {
          this.completeSearchWithoutTashkeel(response[x],this.searchWord)

        }
      } else if (this.fromHezp && this.toHezp) {
        if (response[x].nOFHezb >= this.fromHezp && response[x].nOFHezb <= this.toHezp) {

          this.completeSearchWithoutTashkeel(response[x],this.searchWord)

        }
      } else if (this.fromRob && this.toRob) {
        if (response[x].id >= this.fromRob && response[x].id <= this.toRob) {

          this.completeSearchWithoutTashkeel(response[x],this.searchWord)

        }
      } else if (this.fromPage && this.toPage) {
        if (response[x].nOFPage >= this.fromPage && response[x].nOFPage <= this.toPage) {
          this.completeSearchWithoutTashkeel(response[x],this.searchWord)

        }
      } else {
        this.completeSearchWithoutTashkeel(response[x],this.searchWord)

      }
    }
    this.checkSameWordWithOutTaskeel(this.searchWord);
    if(this.ayas.length==0) {
      console.log(this.searchWord); 
      return;
    }
       

      };
    });
  }
}



// highlightSearchWord(aya: { AyaText_Othmani: string; Aya_N: string; }) {
//   let splittedAya = [];
//   let highlightedAya = [];
//   let len: number;
//   let splittedSearchWord = this.searchWord.split(' ');
//   // for()
// // debugger;
//   // debugger
//   const match = this.searchWord.match(ARABIC_CHARS_REG);
//     let word = match && match.join('').trim();
//     splittedAya = aya.AyaText_Othmani.split(' ');

//   len = splittedAya.length;
//   for (let i = 0; i < len; i++) {
//     if (splittedAya[i] != '') highlightedAya.push({ text: splittedAya[i], highlight: false });
//     if (i != len - 1) {
//       this.numOfMoade3++;
//       highlightedAya.push({ text: this.searchWord, highlight: true });
//     }
//   }
//   // highlightedAya[highlightedAya.length-1].text += ' ('+ aya.Aya_N+')';

//   // } else { //without tashkeel
//   //   splittdAya = aya.AyaText.split(this.searchWord);
//   //   len = splittdAya.length;
//   //   for (let i = 0; i < len; i++) {
//   //     if (splittdAya[i] != '') highlightedAya.push({ text: splittdAya[i], highlight: false });
//   //     if (i != len - 1) {
//   //       this.numOfMoade3++;
//   //       highlightedAya.push({ text: this.searchWord, highlight: true });
//   //     }
//   //   }
//   //   // highlightedAya[highlightedAya.length-1].text += ' ('+ aya.Aya_N+')';
//   // }
//   highlightedAya.push({ text: ' (' + aya.Aya_N + ')', highlight: false });
//   return highlightedAya;
// }
