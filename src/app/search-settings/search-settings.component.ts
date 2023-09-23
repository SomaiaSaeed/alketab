import {Component, OnInit, ViewChild} from '@angular/core';
import {Search} from '../holy-quran/search';
import {Router} from '@angular/router';
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
  selector: 'app-search-settings',
  templateUrl: './search-settings.component.html',
  styleUrls: ['./search-settings.component.scss']
})
export class SearchSettingsComponent implements OnInit {
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
  result: {} = {};
  omomQuraan: boolean = false;
  soraSelected: boolean = false;
  partSelected: boolean = false;
  parts: any[] = [];
  fromSora: any;
  toSora: any;
  fromPart: any;
  toPart: any;
  fromAya: any;
  toAya: any;
  fromRob: any;
  toRob: any;
  fromHezp: any;
  toHezp: any;
  fromPage: any;
  toPage: any;
  _search: Search = new Search();
  texts: string[];
  results: string[];
  // alphabitcalOrder: boolean = true;
  searchData: any;
  results2: string[];
  searchWord: string;
  hasTashkeel: boolean;
  @ViewChild('autoComplete', { static: false })
  autoComplete: AutoComplete;
  // omomQuraan: boolean = false;
  isSameWord: boolean = false;
  alphabitcalOrder: boolean = false;
  ayas: any[] = [];
  searchSettings: any;
  searchInput: string;
  showListOfAyah: boolean = false;
  currentLength: number = 0;
  numOfMoade3: number = 0;
  selectedToSora: any;
  selectedFromSora: any;
  selectedFromAya: any;
  selectedToAya: any;
  selectedFromRob: any;
  selectedToRob: any;
  selectedFromHezp: any;
  selectedToHezp: any;
  selectedFromPage: any;
  selectedToPage: any;
  selectedFromPart: any;
  selectedToPart: any;
  constructor(private router: Router, private _http: HttpClient) {
  }

  search(event) {
    debugger;
    if (event != "oldSearch") {
      this.searchWord = event.query;
      this.results2 = [];
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
      //         this.results2.push(aya.AyaText_Othmani)
      //       }
      //     } else {
      //       if (aya.AyaText_Othmani.startsWith(event.query)) {
      //         this.results2.push(aya.AyaText_Othmani)
      //       }
      //     }


      //   });
      // } else {
      // debugger
      this.hasTashkeel = false;
      this.results2.push("")

      this._http.get<any>(searchURL).subscribe(response => {
      response.forEach(aya => {
        // let text = aya.AyaText_Othmani.replace(new RegExp(String.fromCharCode(1617, 124, 1614, 124, 1611, 124, 1615, 124, 1612, 124, 1616, 124, 1613, 124, 1618,3161,1552), "g"), "");
        // if (this.searchIn.id == 1) {
        if (aya.AyaText.includes(word)) {
          debugger;

          this.results2.push(aya.AyaText_Othmani)
        }
        // } else {
        //   if (aya.AyaText.startsWith(word)) {
        //     this.results2.push(aya.AyaText_Othmani)
        //   }
        // }

      });
      this.autoComplete.completeMethod.emit('oldSearch');

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
        this.results2 = [];
        this.results2 = finalResult;
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
      // this = JSON.parse(localStorage.getItem('result'));
      this.fromSora = this.fromSora && this.fromSora != '.' ? parseInt(this.fromSora) : null;
      this.toSora = this.toSora && this.toSora != '.' ? parseInt(this.toSora) : null;
      this.fromPart = this.fromPart && this.fromPart != '.' ? parseInt(this.fromPart) : null;
      this.toPart = this.toPart && this.toPart != '.' ? parseInt(this.toPart) : null;
      this.fromHezp = this.fromHezp && this.fromHezp != '.' ? parseInt(this.fromHezp) : null;
      this.toHezp = this.toHezp && this.toHezp != '.' ? parseInt(this.toHezp) : null;
      this.fromRob = this.fromRob && this.fromRob != '.' ? parseInt(this.fromRob) : null;
      this.toRob = this.toRob && this.toRob != '.' ? parseInt(this.toRob) : null;
      this.fromPage = this.fromPage && this.fromPage != '.' ? parseInt(this.fromPage) : null;
      this.toPage = this.toPage && this.toPage != '.' ? parseInt(this.toPage) : null;
      this.fromAya = this.fromAya;
      this.toAya = this.toAya;
      this.omomQuraan = this.omomQuraan ? this.omomQuraan : false;
      this.alphabitcalOrder = this.alphabitcalOrder ? this.alphabitcalOrder : false;
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

  // ayatClicked(event) {
  //    
  //   if(event.srcElement.outerText=="السور")
  //   {
  //     this.soraSelected=true;
  //     this.partSelected=false;
  //     this.soras=[];
  //     this._search.table_othmani.forEach(aya=>{
  //
  //          let index =   this.soras.findIndex(sura=>{
  //            return aya.Sura_Name ==sura.اسم_السورة
  //          });
  //
  //          if(index<0) {
  //            this.soras.push({
  //              اسم_السورة: aya.Sura_Name,          الجزء: aya.joz,
  //
  //            });
  //          }
  //          });
  //
  //
  //
  //   }
  //   else if (event.srcElement.outerText=="الجزء") {
  //     this.partSelected=true;
  //     this.soraSelected=false;
  //     this.parts=[];
  //     this._search.table_othmani.forEach(aya=>{
  //
  //       let index =   this.parts.findIndex(sura=>{
  //         return aya.nOFJoz ==sura.الجزء
  //       });
  //
  //       if(index<0) {
  //         this.parts.push({
  //           الجزء: aya.nOFJoz,
  //
  //         });
  //       }
  //     });
  //   }
  //
  // }

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
         if(a>ayaTextArr.length||(a+1<=ayaTextArr.length && searchWord.includes(ayaTextArr[a-1]) && !searchWord.includes(ayaTextArr[a+1]))) end = a;
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
      //     if (this.omomQuraan) {
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
      //     if (this.omomQuraan) {
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
      //     if (this.omomQuraan) {
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
    // if (this.omomQuraan) {
    //   this.searchInOmomAlQuran(aya,searchWord);
    // } else {
    //   this.searchInAyaStart(aya,searchWord);
    // }
  }

  completeSearchWithoutTashkeel(aya,searchWord) {
    if (this.omomQuraan) {
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
  ngOnInit() {
    this.texts = [];
    // this.soras.push({اسم_السورة: '.', nOfAyas: 0});
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
    // this.parts.push({الجزء: '.'});
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
    // this.hezb.push({nOFHezb: '.'});
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
    // this.pages.push({
    //   nOFPage: '.',
    // });
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
    // this.rob.push({
    //   rub: '.',

    // });
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
    // this.fromSoraAyat = [];
    // this.toSoraAyat = [];
    // this.toSoraAyat.push({id: '.'});
    // this.fromSoraAyat.push({id: '.'});
    const x = localStorage.getItem('result');
    debugger;
    if (x) {
      let savedSettings:any = JSON.parse(x);
      let{fromSora,toSora,fromPart, toPart,fromHezp,toHezp,fromRob,toRob,fromPage,toPage,fromAya,toAya,omomQuraan,alphabitcalOrder } = savedSettings;
      this.fromSora = fromSora;
      this.selectedFromSora = this.soras.filter( sora => sora.nOFSura == fromSora)
      debugger
      this.toSora = toSora;
      this.selectedToSora = this.soras.filter( sora => sora.nOFSura == toSora)
      this.fromPart = fromPart;
      this.selectedFromPart = this.parts.filter( part => part.nOFJoz == fromPart)
      this.toPart = toPart;
      this.selectedToPart = this.parts.filter( part => part.nOFJoz == toPart)
      this.fromHezp = fromHezp;
      this.selectedFromHezp = this.hezb.filter( hez => hez.nOFHezb == fromHezp)
      this.toHezp = toHezp;
      this.selectedToHezp = this.hezb.filter( hez => hez.nOFHezb == toHezp)
      this.fromRob = fromRob;
      this.selectedFromRob = this.rob.filter( r => r.rub == fromRob)
      this.toRob = toRob;
      this.selectedToRob = this.rob.filter( r => r.rub == toRob)
      this.fromPage = fromPage;
      this.selectedFromPage = this.pages.filter( page => page.nOFPage == fromPage)
      this.toPage = toPage;
      this.selectedToPage = this.pages.filter( page => page.nOFPage == toPage)
      this.fromAya = fromAya;
      this.selectedFromAya = this.soras.filter( sora => sora.nOfAyas == fromAya)
      this.toAya = toAya;
      this.selectedToAya = this.soras.filter( sora => sora.nOfAyas == toAya)
      this.omomQuraan = omomQuraan;
      this.alphabitcalOrder = alphabitcalOrder;
    }
  }

  selectSearchWords($event: any) {
    let word = this.searchWord.replace(new RegExp(String.fromCharCode(1617, 124, 1614, 124, 1611, 124, 1615, 124, 1612, 124, 1616, 124, 1613, 124, 1618, 3161, 1552), "g"), "");
    this.hasTashkeel = word != this.searchWord;
  }
  
  omomClicked($event: MouseEvent) {
    this.omomQuraan = true;
  }

  fromSoraFun($event: any) {
    this.selectedFromSora = $event.value;
    this.fromSora = $event.value.nOFSura;
    if (this.fromSora) {
      this.parts = [];
      this.hezb = [];
      this.pages = [];
      this.rob = [];
      this.toSoraAyat = [];


      // this.parts.push({الجزء: '.'});
      // this.hezb.push({nOFHezb: '.'});
      // this.rob.push({rub: '.'});
      // this.pages.push({nOFPage: '.'});
      // this.toSoraAyat.push({id: '.'});

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

  toSoraFun($event: any) {
    debugger;
    this.selectedToSora = $event.value;
    this.toSora = $event.value.nOFSura;

    if (this.toSora) {
      this.parts = [];
      this.hezb = [];
      this.pages = [];
      this.rob = [];
      this.toSoraAyat = [];


      // this.parts.push({الجزء: '.'});
      // this.hezb.push({nOFHezb: '.'});
      // this.rob.push({rub: '.'});
      // this.pages.push({nOFPage: '.'});
      // this.toSoraAyat.push({id: '.'});

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

  fromAyaFun($event: any) {
    this.selectedFromAya = $event.value;
    this.fromAya = $event.value.id;
  }

  toAyaFun($event: any) {
    this.selectedToAya = $event.value;
    this.toAya = $event.value.id;
  }

  fromRobFun($event: any) {
    this.selectedFromRob = $event.value;
    this.fromRob = $event.value.ayaId;
  }

  toRobFun($event: any) {
    this.selectedToRob = $event.value;
    this.toRob = $event.value.ayaId;

  }

  fromHezpFun($event: any) {
    this.selectedFromHezp = $event.value;
    this.fromHezp = $event.value.nOFHezb;
  }

  toHezpFun($event: any) {
    this.selectedToHezp = $event.value;
    this.toHezp = $event.value.nOFHezb;
    if (this.toHezp) {
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

    }

  }

  fromPageFun($event: any) {
    this.selectedFromPage = $event.value;
    this.fromPage = $event.value.nOFPage;
  }

  toPageFun($event: any) {
    this.selectedToPage = $event.value;
    this.toPage = $event.value.nOFPage;
  }

  fromPartFun($event: any) {
    this.selectedFromPart = $event.value;
    this.fromPart = $event.value.الجزء;
  }

  toPartFun($event: any) {
    this.selectedToPart = $event.value;
    this.toPart = $event.value.الجزء;
  }

  saveSearch() {
    debugger;
    this.result= {
        'fromSora': this.fromSora, 'toSora': this.toSora,
        'fromPart': this.fromPart, 'toPart': this.toPart,
        'fromHezp': this.fromHezp, 'toHezp': this.toHezp,
        'fromRob': this.fromRob, 'toRob': this.toRob,
        'fromPage': this.fromPage, 'toPage': this.toPage,
        'fromAya': this.fromAya, 'toAya': this.toAya,
        'omomQuraan': this.omomQuraan,
        'alphabitcalOrder': this.alphabitcalOrder,
      };

    localStorage.setItem('result', JSON.stringify(this.result));
    localStorage.setItem('dynamic_cols', JSON.stringify(this.texts));

    this.router.navigate(['/navbar']);
    alert('تم حفظ الاعدادات ');
  }

  wasatClicked($event: MouseEvent) {
    debugger;
    this.omomQuraan = false;
  }

  search1(event) {
    this.results = [];
    this.results.push('رقم_السورة');
    this.results.push('بداية_السورة');
    this.results.push('الربع');
    this.results.push('الجزء');
    this.results.push('رقم_الجزء');
    this.results.push('الحزب');
    this.results.push('رقم_الحزب');
    this.results.push('رقم_الصفحة');
    this.results.push('بداية_الربع');
    this.results.push('بداية_الصفحة');
    this.results.push('اسم_السورة');
    this.results.push('الآية');
  }

  onChange($event: any) {
debugger;
    this.texts.push($event);
  }
  onRemoveItem($event: any) {
  
    debugger;  
    this.texts = this.texts.filter(item => item !== $event);

  }

  alphabitcal_Order($event: MouseEvent) {
    this.alphabitcalOrder = !this.alphabitcalOrder;
  }

  moshafOrder($event: MouseEvent) {
    debugger;
    this.alphabitcalOrder = false;
  }
}

