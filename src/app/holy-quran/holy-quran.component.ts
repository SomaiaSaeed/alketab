import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuranPages} from './QuranPages';
import {QuranInJson} from './QuranInJson';


@Component({
  selector: 'app-holy-quran',
  templateUrl: './holy-quran.component.html',
  styleUrls: ['./holy-quran.component.scss']
})
export class HolyQuranComponent implements OnInit {

  lastTop: number = 10;
  @Input() pageNumber: number;
  @Input('selectedMotashabeh2')
  set setNofMotashabeh(num) {
    this.NofMotashabeh = num;
    this.EmitColorChange(null)
  }
  NofMotashabeh:number;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRight: EventEmitter<any> = new EventEmitter<any>();

  @Output() motahabehClick: EventEmitter<any> = new EventEmitter<any>();
  marginTop: number = 50;
  inputs: ({
    motashabehat: { isRight: boolean; moade3: any[], height: string, top: string };
    ayat: any[];
    aya: string,
    ayaId: string,
    spans: ({ aya: string, top: string; left: string; width: string; height: string })[];
    motashabehatSpans: { isRight: boolean; moade3: string, height: string, top: string }[];
    spansOfColoredWords: { top: string; left: string; width: string; color: string }[];
    isActive: boolean; href: string; activeAya: number
  })[] = [];
  isShiftedVertically: boolean = false;
  quranPageImage: String;
  arrOfAyaWords: string[];
  motashabehatSpans: { isRight: boolean; top: string, moade3: string, height: string }[] = [];
  lastTopRight: number = 0;
  lastTopLeft: number = 0;
  spansOfColoredWords: { top: string; left: string; width: string; color: string, isStatic?: boolean }[];
  suras: string[] = ['البقرة', 'آل عمران', 'النساء', 'المائدة'];
  colors = [
    {color: '#FF0000', text: 'كلمة وحيدة بداية الأية'},
    {color: '#00FF00', text: 'موضعين'},
    {color: '#0000FF', text: 'ثلاث مواضع'},
    {color: '#FFFF00', text: 'أربع مواضع'},
    {color: '#800080', text: 'أكثر من أربع مواضع'},
    {color: '#FFA500', text: 'كلمة وحيدة وسط الأية'},// similar to orange
    {color: '#90ee90', text: 'موضعين وسط الأية'},// similar to lightGreen
    {color: '#ADD8E6', text: 'ثلاث مواضع وسط الأية'},// similar to lightBlue
  
  ];

  // colors = [
  //   {color: '#FFFF00', text: 'أربع مواضع'},
  //   {color: '#0000FF', text: 'ثلاث مواضع'},
  //   {color: '#00FF00', text: 'موضعين'},
  //   {color: '#FF0000', text: 'كلمة وحيدة بداية الأية'},

  //   {color: '#ADD8E6', text: 'ثلاث مواضع وسط الأية'},// similar to lightBlue
  //   {color: '#90ee90', text: 'موضعين وسط الأية'},// similar to lightGreen
  //   {color: '#FFA500', text: 'كلمة وحيدة وسط الأية'},// similar to orange
  //   {color: '#800080', text: 'أكثر من أربع مواضع'},


  // ];
  isNextAyaLeft: boolean = false;
  private searchWord: string;
  private x: {
    suraWithIndex: string,
    errorFactor: string,
    top:string;
    id: number,
    text: string,
    index: number,
    sura: string,
    lastWord?: String,
  }[] = [];
  private allAyas: {
    errorFactor: string,
    top: string,
    id: number,
    aya: string,
    numOfCharsInWholeAya: number,
    ayaIndex: number,
    arrOfColoredWords: {
      word: string,
      color: string,
      lineIndex?: number,
      left?: string,
      isStatic?: boolean
    }[],
    sura: string,
    suraWithIndex: string,
    mooade3: {
      suraWithIndex: string,
      aya?: string,
      id: number,
      color: string
    }[]
  }[] = [];

  constructor(private _quranPages: QuranPages, private _quranInJson: QuranInJson,) {
  }

  findSuras(sura) {
    // debugger
    let index = this.suras.indexOf(sura);
    return index >= 0;
  }

  ngOnInit() {
    // debugger;
    // this.lastTop = 10;
    this.quranPageImage = 'assets/QuranImages_50/' + this.pageNumber + '.png';

    // this.generateMotashabehatOfSelectedPage(this.pageNumber);
    // console.log(this.allAyas);

    // this.determineHighlight();

    // this.drawColoredWords();
  }

  onAyaClick($event: any) {
    // inp.isActive = true
    this.onClick.emit($event);
  }

  onRightClick($event: any) {
    debugger;
    this.onRight.emit($event);

  }

  onMotahabehClick($event: any) {
    // inp.isActive = true
    // debugger
    this.motahabehClick.emit($event);
  }

  addStaticMotashabehat(ayaInPage: { index: number; id: number; customMotashabehat: { motshabeh: string, id: number, color: string, word: string, lineIndex: string, left?: string, aya: string }[]; errorFactor: string; text: string }, ayaDetails: { aya: string; errorFactor: string; id: number; numOfCharsInWholeAya: number; ayaIndex: number; arrOfColoredWords: any[]; sura: string; suraWithIndex: string; mooade3: { suraWithIndex: string; aya?: string, id: number, color: string }[] }) {
    debugger;
    if (ayaInPage.customMotashabehat.length > 0) {
      ayaInPage.customMotashabehat.forEach(mot => {
        ayaDetails.mooade3.push({
          aya: mot.aya,
          id: mot.id,
          suraWithIndex: mot.motshabeh,
          color: this.getColorsInAyaMiddle(mot.color)
        });
        if (mot.color != '' && mot.color != null) {
          ayaDetails.arrOfColoredWords.push(
            {
              word: mot.word, color: this.getColorsInAyaMiddle(mot.color), lineIndex: mot.lineIndex,
              left: mot.left, isStatic: this.isUniqueWord(mot.color) && (mot.word != "a")//to avoid duplicated border
            }
          );
        }

      });

    }
    return ayaDetails;
  }

  getColorsInAyaMiddle(color: string) {
    switch (color) {
      case "orange":
        return this.colors[5].color;
      case "lightGreen":
        return this.colors[6].color;
      case "lightBlue":
        return this.colors[7].color;
    }

  }

  isUniqueWord(color: string) {
    return color != this.colors[5].color
      && color != this.colors[6].color
      && color != "lightBlue"
      && color != "lightGreen";
  }

  EmitColorChange($event: any) {
    this.lastTop = 10;
    this.marginTop = 20;
    this.inputs = [];
    this.isNextAyaLeft =false;
    this.isShiftedVertically = false;
    this.arrOfAyaWords = [];
    this.motashabehatSpans = [];
    this.lastTopRight = 0;
    this.lastTopLeft = 0;
    this.spansOfColoredWords = [];
    this.searchWord = '';
    this.x = [];
    this.allAyas = [];


    this.generateMotashabehatOfSelectedPage(this.pageNumber);
    console.log(this.allAyas);

    this.determineHighlight();

    this.drawColoredWords();
  }

  private generateMotashabehatOfSelectedPage(pageNumber) {
    this._quranPages.pages[pageNumber - 1].ayas.forEach(ayaInPage => {
      this.arrOfAyaWords = ayaInPage.text.split(' ');
      this.searchWord = this.arrOfAyaWords[0];
      let isCheckIn = false;
      let ayaDetails: {
        aya: string,
        errorFactor: string,
        top: string;
        id: number,
        numOfCharsInWholeAya: number,
        ayaIndex: number,
        arrOfColoredWords: any[],
        sura: string,
        suraWithIndex: string,
        mooade3: {
          suraWithIndex: string,
          aya?: string,
          id: number,
          color: string
        }[]
      } = {
        arrOfColoredWords: [], errorFactor: '',top:'', id: 0, mooade3: [], suraWithIndex: '', sura: '',
        aya: '', ayaIndex: 0, numOfCharsInWholeAya: 0,
      };
      let arrayOfMot = [];
      let arrayOfWordsWithColors = [];
      for (let i = 0; i <= this.arrOfAyaWords.length; i++) {
        this.x = [];
        let countSuras = [];

        if (i == 0) {
          this.searchWord = this.arrOfAyaWords[0];
        } else {
          this.searchWord = this.searchWord + ' ' + this.arrOfAyaWords[i];
        }
        this._quranInJson.suras.forEach(sura => {
          // if(this.findSuras(sura.name)){
          sura.aya.forEach(aya => {
            if (aya.text.startsWith(this.searchWord)) {
              this.x.push({
                id: ayaInPage.id,
                errorFactor: ayaInPage.errorFactor,
                top: ayaInPage.top,
                text: aya.text,
                index: aya.index,
                suraWithIndex: sura.name + ' (' + aya.index + ') ',
                sura: sura.name,
                lastWord: this.searchWord
              });
              if (countSuras.indexOf(sura.name) < 0) {//to calculate number of suras for motashabeh
                countSuras.push(sura.name);
              }
            }
            // }
          });
          // }
        });

        if (this.x.length == 1) {
          arrayOfWordsWithColors.push({
            word: this.x[0].lastWord,
            color: arrayOfWordsWithColors.length == 0 ? this.colors[0].color : this.colors[5].color,
          });
          if (!isCheckIn) {
            ayaDetails =
              {
                errorFactor: this.x[0].errorFactor,
                top:this.x[0].top,
                id: this.x[0].id,
                aya: this.x[0].text,
                numOfCharsInWholeAya: this.x[0].text.length,
                ayaIndex: this.x[0].index,
                arrOfColoredWords: arrayOfWordsWithColors,
                sura: this.x[0].sura,
                suraWithIndex: this.x[0].suraWithIndex,
                mooade3: arrayOfMot
              };
            isCheckIn = true;
          } else {
            ayaDetails.arrOfColoredWords = arrayOfWordsWithColors;
          }

          break;
        } else if (this.x.length == 2) {
          arrayOfWordsWithColors.push({word: this.x[0].lastWord, color: this.colors[1].color,});

          if (!isCheckIn) {
            this.x.forEach(mode3 => {
              arrayOfMot.push({
                id: mode3.id,
                suraWithIndex: mode3.suraWithIndex,
                aya: mode3.text,
              });
            });
            ayaDetails = {
              errorFactor: this.x[0].errorFactor,
              top:this.x[0].top,
              id: this.x[0].id,
              aya: this.x[0].text,
              numOfCharsInWholeAya: this.x[0].text.length,
              ayaIndex: this.x[0].index,
              sura: this.x[0].sura,
              suraWithIndex: this.x[0].suraWithIndex,
              arrOfColoredWords: arrayOfWordsWithColors,
              mooade3: arrayOfMot
            };
            isCheckIn = true;
          } else {
            ayaDetails.arrOfColoredWords = arrayOfWordsWithColors;
          }

        } else if (this.x.length == 3) {
          arrayOfWordsWithColors.push({word: this.x[0].lastWord, color: this.colors[2].color,});

          if (!isCheckIn) {
            this.x.forEach(mode3 => {
              arrayOfMot.push({
                id: mode3.id,
                suraWithIndex: mode3.suraWithIndex,
                aya: mode3.text,
              });
            });
            ayaDetails = {
              errorFactor: this.x[0].errorFactor,
              top:this.x[0].top,
              id: this.x[0].id,
              aya: this.x[0].text,
              numOfCharsInWholeAya: this.x[0].text.length,
              ayaIndex: this.x[0].index,
              sura: this.x[0].sura,
              suraWithIndex: this.x[0].suraWithIndex,
              arrOfColoredWords: arrayOfWordsWithColors,
              mooade3: arrayOfMot
            };
            isCheckIn = true;
          } else {
            ayaDetails.arrOfColoredWords = arrayOfWordsWithColors;
          }

        } else if (this.x.length == 4) {
          arrayOfWordsWithColors.push({word: this.x[0].lastWord, color: this.colors[3].color,});

          if (!isCheckIn) {
            this.x.forEach(mode3 => {
              arrayOfMot.push({
                id: mode3.id,
                suraWithIndex: mode3.suraWithIndex,
                aya: mode3.text,
              });
            });
            ayaDetails = {
              errorFactor: this.x[0].errorFactor,
              top:this.x[0].top,
              id: this.x[0].id,
              aya: this.x[0].text,
              numOfCharsInWholeAya: this.x[0].text.length,
              ayaIndex: this.x[0].index,
              sura: this.x[0].sura,
              suraWithIndex: this.x[0].suraWithIndex,
              arrOfColoredWords: arrayOfWordsWithColors,
              mooade3: arrayOfMot
            };
            isCheckIn = true;
          } else {
            ayaDetails.arrOfColoredWords = arrayOfWordsWithColors;
          }

        } else if (this.x.length > 4) {
          arrayOfWordsWithColors.push({word: this.x[0].lastWord, color: this.colors[4].color,});
          if (countSuras.length <= 6 || this.x.length <= 7) {
            if (!isCheckIn) {
              this.x.forEach(mode3 => {
                arrayOfMot.push({
                  id: mode3.id,
                  suraWithIndex: mode3.suraWithIndex,
                  aya: mode3.text,
                });
              });
              ayaDetails = {
                errorFactor: this.x[0].errorFactor,
                top:this.x[0].top,
                id: this.x[0].id,
                aya: this.x[0].text,
                numOfCharsInWholeAya: this.x[0].text.length,
                ayaIndex: this.x[0].index,
                sura: this.x[0].sura,
                suraWithIndex: this.x[0].suraWithIndex,
                arrOfColoredWords: arrayOfWordsWithColors,
                mooade3: arrayOfMot
              };
              isCheckIn = true;
            } else {
              ayaDetails.arrOfColoredWords = arrayOfWordsWithColors;
            }

          } else {
            ayaDetails.arrOfColoredWords = arrayOfWordsWithColors;
          }
        }
      }
      // ayaDetails = this.addStaticMotashabehat(ayaInPage, ayaDetails);
      this.allAyas.push(ayaDetails);
    });
  }

  private determineHighlight() {
    debugger;
    let ayasLines = [];
    this.allAyas.forEach(aya => {
      if (aya.ayaIndex == 1) {
        this.marginTop = 95;
      }
      let ayaStart = this.marginTop;
      let ayaEnd;

      let numOfAyaChars = aya.numOfCharsInWholeAya;
      if (aya.errorFactor != '') {
        let operation = aya.errorFactor.split(' ')[0];
        let factor = aya.errorFactor.split(' ')[1];
        if (operation == '+') {
          numOfAyaChars = numOfAyaChars + parseInt(factor);
        } else {
          debugger;
          numOfAyaChars = numOfAyaChars - parseInt(factor);
        }

      }


      console.log('numOfAyaChars: ' + numOfAyaChars);
      let isFirst = true;
      let temp = [];
      while (numOfAyaChars >= 0) {
        if (isFirst) {
          debugger;
          temp = [];
          if (numOfAyaChars >= 80 && ayasLines[ayasLines.length - 1] == 80) {
            ayasLines = [];
          } else if (ayasLines[ayasLines.length - 1] < 80) {//if(ayasLines[ayasLines.length-1]<80)
            this.isNextAyaLeft = ayasLines[ayasLines.length - 1] > 45;
            temp = ayasLines;
            ayasLines = [];
            numOfAyaChars = numOfAyaChars - (80 - temp[temp.length - 1]);
            ayasLines.push(80 - temp[temp.length - 1]);
            this.marginTop -= 43.75;
          }
        }
        if (numOfAyaChars >= 0) {
          if (numOfAyaChars >= 80) {
            ayasLines.push(80);
            numOfAyaChars = numOfAyaChars - 80;
          } else {
            if (temp.length > 0) {
              // numOfAyaChars=  numOfAyaChars - (80 - temp[temp.length - 1]);
              ayasLines.push(numOfAyaChars);
              if (numOfAyaChars < 80) {
                break;
              }

            } else {
              ayasLines.push(numOfAyaChars);
              numOfAyaChars = numOfAyaChars - 80;
            }

          }

        } else {
          break;
        }

        isFirst = false;
      }
      // console.log('ayasLines: ' + ayasLines);
      let spans = [];
      // let verticalErorr = this.marginTop;

      for (let i = 0; i < ayasLines.length; i++) {
        let ayaText = '';
        // ----------------------
        let operationY = aya.top?.split(' ')[0];
        let factorY = aya.top?.split(' ')[1];
        if (aya.top && operationY == '+') {
          debugger;
          this.marginTop += parseInt(factorY);
        } else if(aya.top && operationY == '-') {
          this.marginTop -= parseInt(factorY);
        }
                // ----------------------

        spans.push({
          aya: aya.aya,
          top:  this.marginTop + 'px',
          left: temp.length != 0 ? i == 0 ? 60 + 'px' : 60 + (80 - ayasLines[i]) * 5 + 'px' : 60 + (80 - ayasLines[i]) * 5 + 'px',
          width: ayasLines[i] * 5 + 'px',
          height: '35px'
        });
        if (i == ayasLines.length - 1 || i == 0 || ayasLines[i] == 80) {
          this.marginTop += 43.75;
        }
        this.isShiftedVertically = i == ayasLines.length - 1;
      }
      ayaEnd =  this.marginTop;
      this.motashabehatSpans = [];
      this.inputs.push({
        motashabehat: {top: '', height: '', isRight: this.isNextAyaLeft, moade3: []},
        ayat: [],
        aya: aya.aya,
        ayaId: aya.id.toString(),
        isActive: false,
        href: '#' + aya.ayaIndex,
        activeAya: aya.ayaIndex,
        spans: spans,
        motashabehatSpans: [],
        spansOfColoredWords: []
      });
      this.drawMotashabehat(aya, ayaStart, ayaEnd);

    });
  }

  private drawMotashabehat(aya: {
    errorFactor: string,
    top: string,
    id: number,
    aya: string,
    numOfCharsInWholeAya: number,
    ayaIndex: number,
    arrOfColoredWords: any[],
    sura: string,
    suraWithIndex: string,
    mooade3: {
      suraWithIndex: string,
      aya?: string,
      id: number,
      color: string
    }[]
  }, ayaStart: number, ayaEnd: number) {
    let height = ayaEnd - ayaStart;
    let index = this.allAyas.indexOf(aya);
    if (aya.mooade3.length > 0) {
      this.lastTopLeft = 0;
      let leftStartindex = this.fillRightArrayFirst(index, aya.mooade3, ayaStart, ayaEnd);
      this.addMoade3(index, aya.mooade3, ayaStart, ayaEnd);
      if (this.allAyas[index].mooade3.length > 0) {
        let ayat = [];
        this.allAyas[index].mooade3.forEach(m => {
          ayat.push(m.aya);
        });
        this.inputs[index].ayat = ayat;
      }
    }

  }

  private drawColoredWords() {
    for (let j = 0; j < this.allAyas.length; j++) {
      debugger;
      this.spansOfColoredWords = [];
      let lastWord = '';
      let isMoveToNextLine = false;
      let lineIndex = 0;
      let previousColor;
      let space = 0;
      let left = parseInt(this.inputs[j].spans[lineIndex].left) + parseInt(this.inputs[j].spans[lineIndex].width);
      let top = this.inputs[j].spans[lineIndex].top.split('px')[0];
      for (let i = 0; i < this.allAyas[j].arrOfColoredWords.length; i++) {
        let width = 0;
        if (previousColor == this.allAyas[j].arrOfColoredWords[i].color) {
          space = 0;
        } else {
          space = 2;
        }

        if (i == 0) {
          width = this.allAyas[j].arrOfColoredWords[i].word.length * 5;
          left = left - width;
          this.spansOfColoredWords.push({
            top: parseInt(top) + 35 + 'px',
            color: this.allAyas[j].arrOfColoredWords[i].color,
            width: width + 'px',
            left: left + 'px',
            isStatic: this.allAyas[j].arrOfColoredWords[i].isStatic
          });
          lastWord = this.allAyas[j].arrOfColoredWords[0].word;

        } else {
          // debugger;
          let currentWord = '';
          currentWord = this.allAyas[j].arrOfColoredWords[i].word.split(lastWord)[1];
          if (currentWord != undefined) {
            width = currentWord.length * 5;

          } else {
            width = this.allAyas[j].arrOfColoredWords[i].word.length * 5;
            if (this.allAyas[j].arrOfColoredWords[i].word != '' && this.allAyas[j].arrOfColoredWords[i].word.length > 2 && this.inputs[j].spans.length > this.allAyas[j].arrOfColoredWords[i].lineIndex) {
              top = this.inputs[j].spans[this.allAyas[j].arrOfColoredWords[i].lineIndex].top;
              left = parseInt(this.allAyas[j].arrOfColoredWords[i].left);
            }

          }
          if (currentWord != undefined) {
            if ((left - width - space) > 50) {
              left = left - width - space;
              this.spansOfColoredWords.push({
                top: parseInt(top) + 35 + 'px',
                color: this.allAyas[j].arrOfColoredWords[i].color,
                width: width + 'px',
                left: left + 'px',
                isStatic: this.allAyas[j].arrOfColoredWords[i].isStatic
              });
              isMoveToNextLine = false;
            } else {
              isMoveToNextLine = true;
              lineIndex++;
              top = this.inputs[j].spans[lineIndex] ? this.inputs[j].spans[lineIndex].top.split('px')[0] : '0';
              left = this.inputs[j].spans[lineIndex] ? (parseInt(this.inputs[j].spans[lineIndex].left) + parseInt(this.inputs[j].spans[lineIndex].width) - width - space) : 0;
              this.spansOfColoredWords.push({
                top: parseInt(top) + 35 + 'px',
                color: this.allAyas[j].arrOfColoredWords[i].color,
                width: width + 'px',
                left: left + 'px',
                isStatic: this.allAyas[j].arrOfColoredWords[i].isStatic
              });
            }
          } else {
            left = left - width - space;
            this.spansOfColoredWords.push({
              top: parseInt(top) + 35 + 'px',
              color: this.allAyas[j].arrOfColoredWords[i].color,
              width: width + 'px',
              left: left + 'px',
              isStatic: this.allAyas[j].arrOfColoredWords[i].isStatic
            });
          }


          lastWord = this.allAyas[j].arrOfColoredWords[i].word;

        }
        previousColor = this.allAyas[j].arrOfColoredWords[i].color;

      }
      console.log(this.spansOfColoredWords);
      this.inputs[j].spansOfColoredWords = this.spansOfColoredWords;
      console.log(this.inputs[j]);


    }
  }

  private fillRightArrayFirst(index, mooade3: { suraWithIndex: string; aya?: string, id: number }[], ayaStart, ayaEnd) {
    // debugger
    let rightArr = '';
    // let  ayat =[];
    for (let i = 0; i < mooade3.length; i++) {
      // ayat.push(mooade3[i].aya);
      // if (this.lastTopRight == 0) {//for first aya contains motashabeh in page
      this.lastTopRight += 30;
      if (this.lastTopRight < ayaEnd + 10) {
        // rightArr.push(mooade3[i]);
        // while(mooade3[i].suraWithIndex.length<15) {mooade3[i].suraWithIndex += " ";}
        rightArr = rightArr + mooade3[i].suraWithIndex + '';
        let top = (index == 0) ? ayaStart : ayaStart - 30;
        if (i == mooade3.length - 1) {
          this.motashabehatSpans.push({
            top: top + 'px',
            isRight: this.isNextAyaLeft,
            moade3: rightArr,
            height: (ayaEnd - ayaStart - 15) + 'px'
          });
          this.inputs[index].motashabehatSpans = this.motashabehatSpans;
          console.log(rightArr);
        }

      } else {
        this.motashabehatSpans.push({
          top: ayaStart + 'px',
          isRight: this.isNextAyaLeft,
          moade3: rightArr,
          height: (ayaEnd - ayaStart - 30) + 'px'
        });
        this.inputs[index].motashabehatSpans = this.motashabehatSpans;
        console.log(rightArr);
        return i;
      }
    }
    // this.inputs[index].ayat = ayat;

  }

  private addMoade3(index: number, moade3: { suraWithIndex: string; aya?: string; id: number, color: string }[], ayaStart: number, ayaEnd: number) {
    let motashabehat: { isRight: boolean; moade3: any[], height: string, top: string } = {
      top: '',
      height: '',
      isRight: this.isNextAyaLeft,
      moade3: []
    };
    let arr: { top: string, suraWithIndex: string; aya?: string; id: number, color: string }[] = [];
    if (this.lastTop == 10) {
      this.lastTop = ayaStart;
    } else {
      this.lastTop += 25;
    }
    if (moade3 && moade3.length > 0) {
      moade3.forEach(m => {
        if (m.suraWithIndex != '') {
          arr.push({
            top: this.lastTop + 'px',
            suraWithIndex: m.suraWithIndex,
            aya: m.aya,
            id: m.id,
            color: m.color
          });

          this.lastTop += 25;
        }
      });
// debugger
      motashabehat.height = ((parseInt(arr[arr.length - 1].top) + 25) - parseInt(arr[0].top)) + 'px';
      arr.length = this.NofMotashabeh<arr.length?this.NofMotashabeh:arr.length;
      motashabehat.moade3 = arr;
      this.inputs[index].motashabehat = motashabehat;


    }
  }


}

