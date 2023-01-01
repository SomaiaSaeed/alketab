import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dynamic-aya',
  templateUrl: './dynamic-aya.component.html',
  styleUrls: ['./dynamic-aya.component.scss']
})
export class DynamicAyaComponent implements OnInit {
  @Input() pageNum: String;
  @Input() ayaNumber: String;
  @Input() ayaId: number;
  @Input() href: String;
  @Input() activeAya: any;
  @Input() isActive: boolean;
  @Input() spans: { top: string; left: string; width: string; height: string }[];
  @Input() arrOfColoredWords: { top: string; left: string; width: string; color: string, isStatic: boolean }[];
  @Input() ayat: [];
  // @Input() motashabehatSpans: { isRight: boolean; top: string; name: string,height: string }[];
  @Input() motashabehatSpans: { isRight: boolean; moade3: string, height: string, top: string, isRightClicked: boolean }[];
  @Input() motashabehat: { isRight: boolean; moade3: { top: string, suraWithIndex: string; aya?: string; id: string }[], height: string, top: string } = {
    top: '',
    height: '',
    isRight: true,
    moade3: []
  };
  // test = [{name: "البقرة (15)", top: "45px", isRight: true,}, {
  //   name: "الرعد (5)",
  //   top: "75px",
  //   isRight: false,
  // }, {name: "الطور (15)", top: "45px", isRight: false,}];
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRight: EventEmitter<any> = new EventEmitter<any>();

  @Output() onMotahabehClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() aya = '';

  bakgroundStyle2: { background: string; motashOpacity: number; opacity: number };
  @ViewChild('container', { static: false }) contain: ElementRef;
  listMenuStyle: Object = {
    left: '0px',
    top: '0px',
    position: 'relative',
    'z-index': 200,
    width: '175px',
    height: '60px'
  };
  showAyaList: boolean = false;
  selectedAyaID: number;
  selectedmot: any;
  bakgroundStyle = { background: "white", opacity: 0.0, motashOpacity: 1 };
  moade3: any;
  lineTop: any;
  ayas: any[];
  bookmakNote: string;
  addNote: boolean = false;

  listAyaItems: any[] = [
    {
      label: 'سماع', command: (event) => {
        this.showAyaList = false;
        this.onRight.emit(event)
      }

    },
    {
      label: 'تفسير', command: (event) => {
        this.ayas = [];
        // this.ayas.push(this.aya);
        // this.ayas.push(this.selectedmot.aya);
        this.onRight.emit(event);
        this.showAyaList = false;
        // this.OpenDialoge = true;
      },
    }, {
      label: 'نسخ', command: (event) => {
        this.showAyaList = false;
        this.onRight.emit(event)
      }

    }, {
      label: 'اضافة الى المفضلة', command: (event) => {
        this.showAyaList = false;
        this.onRight.emit(event)
        this.addNote = true;

      }

    },

    {
      label: 'facebook',
      icon: 'fa fa-facebook',
      command: (event) => {
        this.showAyaList = false;
        this.onRight.emit(event)
      },
    },
    {
      label: 'gmail',
      icon: 'fa fa-google', command: (event) => {
        this.showAyaList = false;
        this.onRight.emit(event)
      },
    },
    {
      label: 'whatsapp',
      icon: 'fa fa-whatsapp', command: (event) => {
        this.showAyaList = false;
        this.onRight.emit(event)
      },
    },
    {
      label: 'إغلاق', command: (event) => {
        this.showAyaList = false;
      }

    },
  ];
  title: any = '';
  ayaIsClicked: boolean;
  showList: boolean = false;
  OpenDialoge: boolean = false;
  listMenuItems: any[] = [
    {
      label: 'ذهاب الي الايه', command: (event) => {
        this.showList = false;
        this.onMotahabehClick.emit(this.selectedAyaID)
      }

    },
    {
      label: 'مقارنة مع الحالي', command: (event) => {
        this.ayas = [];
        this.ayas.push({ aya: this.aya, sura: '' });
        this.ayas.push({ aya: this.selectedmot.aya, sura: this.selectedmot.suraWithIndex });
        this.showList = false;
        this.OpenDialoge = true;
      }
    },
    {
      label: 'مقارنة مع الجميع بدون أنظر', command: (event) => {
        this.ayat.forEach(aya => {
          this.ayas = [];
          this.ayas.push({ aya: aya, sura: '' });
        });
        this.showList = false;
        this.OpenDialoge = true;
      }
    }, {
      label: 'مقارنة مع الجميع', command: (event) => {
        this.ayat.forEach(aya => {
          this.ayas = [];
          this.ayas.push({ aya: aya, sura: '' });
        });
        this.showList = false;
        this.OpenDialoge = true;
      }
    }
  ];

  constructor() {
  }

  ngOnInit() {

    // this.bakgroundStyle = { background: "yellow", opacity: .2, motashOpacity: 1 };


    this.moade3 = this.motashabehat.moade3;
    if (this.moade3 && this.moade3.length > 0) {
      console.log("motashabehat::" + this.moade3[this.moade3.length - 1].top);
      this.lineTop = (parseInt(this.moade3[this.moade3.length - 1].top.replace('px', '')) + 25).toString() + 'px';
    }

    if (this.motashabehatSpans && this.motashabehatSpans.length > 0) {
      this.motashabehatSpans.forEach(mot => {
        if (mot.moade3) {
          let arr = mot.moade3.split(' ');
        }
      });
    }
    this.ayaIsClicked = false;

  }

  onRightClick(event) {
    debugger;
    event.preventDefault();
    this.showAyaList = true;

    let XL = event.clientX - this.contain.nativeElement.getBoundingClientRect().left + this.contain.nativeElement.scrollLeft - 200;
    let YL = event.clientY - this.contain.nativeElement.getBoundingClientRect().top + this.contain.nativeElement.scrollTop;
    this.listMenuStyle['top'] = YL + 'px';
    this.listMenuStyle['left'] = XL + 'px';
    this.onRight.emit(event);

  }

  aya_clicked(event) {
    this.onClick.emit(this.ayaId);
    // this.activeAya = ayaNum;
    // if(this.activeAya == this.href.split('#')[1])
    // this.ayaIsClicked = true;

    this.bakgroundStyle2 = { background: "blue", opacity: .2, motashOpacity: 0.2 }
    // event.preventDefault();
    // event.stopPropagation();
  }

  onMouseEnter($event) {
    // if(!this.ayaIsClicked)
    this.bakgroundStyle = { background: "yellow", opacity: .2, motashOpacity: 0.2 };
  }

  onMouseOut($event: MouseEvent) {
    // if(!this.ayaIsClicked)
    this.bakgroundStyle = { background: "white", opacity: 0.0, motashOpacity: 1 };
  }

  onMotashabehRightClick(event, mot) {
    event.preventDefault();
    debugger;
    if (!this.showList) {
      this.selectedmot = mot;
      this.selectedAyaID = mot.id;
      this.showList = true;
      // mot.isRightClicked= false;
      // this.OpenDialoge = true;
      let XL = event.clientX - this.contain.nativeElement.getBoundingClientRect().left + this.contain.nativeElement.scrollLeft - 200;
      let YL = event.clientY - this.contain.nativeElement.getBoundingClientRect().top + this.contain.nativeElement.scrollTop;
      this.listMenuStyle['top'] = YL + 'px';
      this.listMenuStyle['left'] = XL + 'px';
    } else {
      this.showList = false;
    }

  }

  // onMoueHover(word: { top: string; left: string; width: string; color: string }) {
  //   this.title = this.aya;
  // }
  getTopBorder(top: string) {
    let x = top.split('px');
    let y = parseInt(x[0]) - 35;
    return y + 'px';

  }

  addToFav() {
    let bookmarks = localStorage.getItem('bookmarks')
    if (bookmarks == undefined || bookmarks == null) {
      bookmarks = JSON.stringify([]);

    }
    let allBookmarks = JSON.parse(bookmarks)
    let index = allBookmarks.findIndex(bm => bm.aya == this.ayaId)
    if (index == -1) {
      allBookmarks.push({ page: this.pageNum, aya: this.ayaId, note: this.bookmakNote })
      localStorage.setItem('bookmarks', JSON.stringify(allBookmarks))
    }
    this.addNote = false
  }

}

