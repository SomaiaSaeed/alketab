import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  juzs: ({ id: number;  verse_mapping: string[]; juz_number: number,first_verse_id:number;last_verse_id:number,verses_count:number })[];
  parts:any[]=[];


  constructor(private router: Router,private http: HttpClient) {
    this.juzs= [
      {
          "id": 1,
          "juz_number": 1,
          "verse_mapping": [
            "الفاتحة",
            "البقرة"
          ],         
          "first_verse_id": 1,
          "last_verse_id": 148,
          "verses_count": 148
      },
      {
          "id": 2,
          "juz_number": 2,
          "verse_mapping": [
            "البقرة"
      ],
          "first_verse_id": 149,
          "last_verse_id": 259,
          "verses_count": 111
      },
      {
          "id": 3,
          "juz_number": 3,
          "verse_mapping": [
            "البقرة",
            "ال عمران"
             ],
          "first_verse_id": 260,
          "last_verse_id": 385,
          "verses_count": 126
      },
      {
          "id": 4,
          "juz_number": 4,
          "verse_mapping": [
            "ال عمران",    
            "النساء"       
          ],
          "first_verse_id": 386,
          "last_verse_id": 516,
          "verses_count": 131
      },
      {
          "id": 5,
          "juz_number": 5,
          "verse_mapping": [
              "النساء"
          ],
          "first_verse_id": 517,
          "last_verse_id": 640,
          "verses_count": 124
      },
      {
          "id": 6,
          "juz_number": 6,
          "verse_mapping": [
            "النساء",
            "المائدة"
          ],
          "first_verse_id": 641,
          "last_verse_id": 750,
          "verses_count": 110
      },
      {
          "id": 7,
          "juz_number": 7,
          "verse_mapping": [
            "المائدة",
              "الأنعام"
          ],
          "first_verse_id": 751,
          "last_verse_id": 899,
          "verses_count": 149
      },
      {
          "id": 8,
          "juz_number": 8,
          "verse_mapping": [
            "الأنعام",
            "الأعراف"
          ],
          "first_verse_id": 900,
          "last_verse_id": 1041,
          "verses_count": 142
      },
      {
          "id": 9,
          "juz_number": 9,
          "verse_mapping": [
            "الأعراف",
              "الأنفال"
          ],
          "first_verse_id": 1042,
          "last_verse_id": 1200,
          "verses_count": 159
      },
      {
          "id": 10,
          "juz_number": 10,
          "verse_mapping": [
              "الأنفال",
              "التوبه"
          ],
          "first_verse_id": 1201,
          "last_verse_id": 1327,
          "verses_count": 127
      },
      {
          "id": 11,
          "juz_number": 11,
          "verse_mapping": [
              "التوبه",
              "يونس",
              "هود"
          ],
          "first_verse_id": 1328,
          "last_verse_id": 1478,
          "verses_count": 151
      },
      {
          "id": 12,
          "juz_number": 12,
          "verse_mapping": [
              "هود",
              "يوسف"
          ],
          "first_verse_id": 1479,
          "last_verse_id": 1648,
          "verses_count": 170
      },
      {
          "id": 13,
          "juz_number": 13,
          "verse_mapping": [
              "يوسف",
              "الرعد",
              "ابراهيم"
          ],
          "first_verse_id": 1649,
          "last_verse_id": 1802,
          "verses_count": 154
      },
      {
          "id": 14,
          "juz_number": 14,
          "verse_mapping": [
              "الحجر",
              "النحل"
            ],
          "first_verse_id": 1803,
          "last_verse_id": 2029,
          "verses_count": 227
      },
      {
          "id": 15,
          "juz_number": 15,
          "verse_mapping": [
              "الاسراء",
              "الكهف"
            ],
          "first_verse_id": 2030,
          "last_verse_id": 2214,
          "verses_count": 185
      },
      {
          "id": 16,
          "juz_number": 16,
          "verse_mapping": [
              "الكهف",
              "مريم",
              "طه"
    ],
          "first_verse_id": 2215,
          "last_verse_id": 2483,
          "verses_count": 269
      },
      {
          "id": 17,
          "juz_number": 17,
          "verse_mapping": [
              "الانبياء",
              "الحج"
          ],
          "first_verse_id": 2484,
          "last_verse_id": 2673,
          "verses_count": 190
      },
      {
          "id": 18,
          "juz_number": 18,
          "verse_mapping": [
              "المؤمنون",
              "النور",
              "الفرقان"
          ],
          "first_verse_id": 2674,
          "last_verse_id": 2875,
          "verses_count": 202
      },
      {
          "id": 19,
          "juz_number": 19,
          "verse_mapping": [
              "الفرقان",
              "الشعراء",
              "النمل"
          ],
          "first_verse_id": 2876,
          "last_verse_id": 3214,
          "verses_count": 339
      },
      {
          "id": 20,
          "juz_number": 20,
          "verse_mapping": [
              "النمل",
              "القصص",
              "العنكبوت"
          ],
          "first_verse_id": 3215,
          "last_verse_id": 3385,
          "verses_count": 171
      },
      {
          "id": 21,
          "juz_number": 21,
          "verse_mapping": [
              "العنكبوت",
              "الروم",
              "لقمان",
              "السجدة",
              "الأحزاب"
          ],
          "first_verse_id": 3386,
          "last_verse_id": 3563,
          "verses_count": 178
      },
      {
          "id": 22,
          "juz_number": 22,
          "verse_mapping": [
            "الأحزاب",
              "سبأ",
              "فاطر",
              "يس"
          ],
          "first_verse_id": 3564,
          "last_verse_id": 3732,
          "verses_count": 169
      },
      {
          "id": 23,
          "juz_number": 23,
          "verse_mapping": [
              "يس",
              "الصافات",
              "ص",
              "الزمر"
          ],
          "first_verse_id": 3733,
          "last_verse_id": 4089,
          "verses_count": 357
      },
      {
          "id": 24,
          "juz_number": 24,
          "verse_mapping": [
              "الزمر",
              "غافر",
              "فصلت"
          ],
          "first_verse_id": 4090,
          "last_verse_id": 4264,
          "verses_count": 175
      },
      {
          "id": 25,
          "juz_number": 25,
          "verse_mapping": [
              "فصلت",
              "الشوري",
              "الزخرف",
              "الدخان",
              "الجاثية"
          ],
          "first_verse_id": 4265,
          "last_verse_id": 4510,
          "verses_count": 246
      },
      {
          "id": 26,
          "juz_number": 26,
          "verse_mapping": [
              "الأحقاف",
              "محمد",
              "الفتح",
              "الحجرات",
              "ق",
              "الذاريات"
          ],
          "first_verse_id": 4511,
          "last_verse_id": 4705,
          "verses_count": 195
      },
      {
          "id": 27,
          "juz_number": 27,
          "verse_mapping": [
            "الذاريات",
              "الطور",
              "النجم",
              "القمر",
              "الرحمن",
              "الواقعه",
              "الحديد"
          ],
          "first_verse_id": 4706,
          "last_verse_id": 5104,
          "verses_count": 399
      },
      {
          "id": 28,
          "juz_number": 28,
          "verse_mapping": [
              "المجادله",
              "الحشر",
              "الممتحنة",
              "الصف",
              "الجمعة",
              "المنافقون",
              "التغابن",
              "الطلاق",
              "التحريم"
          ],
          "first_verse_id": 5105,
          "last_verse_id": 5241,
          "verses_count": 137
      },
      {
          "id": 29,
          "juz_number": 29,
          "verse_mapping": [
              "الملك",
              "القلم",
              "الحاقة",
              "المعارج",
              "نوح",
              "الجن",
              "المزمل",
              "المثر",
              "القيامة",
              "الانسان",
              "المرسلات"
          ],
          "first_verse_id": 5242,
          "last_verse_id": 5672,
          "verses_count": 431
      },
      {
          "id": 30,
          "juz_number": 30,
          "verse_mapping": [
              "النبأ",
              "النازعات",
              "عبس",
              "التكوير",
              "الانفطار",
              "المطففين",
              "الانشقاق",
              "البروج",
              "الطارق",
              "الأعلي",
              "الغاشية",
              "الفجر",
              "البلد",
              "الشمس",
              "الليل",
              "الضحي",
              "الشرح",
              "التين",
              "العلق",
              "القدر",
              "البينة",
              "الزلزلة",
              "العاديات",
              "القارعة",
              "التكاثر",
              "العصر",
              "الهمزة",
              "الفيل",
              "قريش",
              "الماعون",
              "الكوثر",
              "الكافرون",
              "النصر",
              "المسد",
              "الاخلاص",
              "الفلق",
              "الناس"
    ],
          "first_verse_id": 5673,
          "last_verse_id": 6236,
          "verses_count": 564
      }
  ]
  }
  ngOnInit(): void {
this.allParts();                                }
 

      
  allParts() {
        this.juzs.forEach((aya)=>{
          this.parts.push(aya.verse_mapping);
        });
      
    }
  }

  


