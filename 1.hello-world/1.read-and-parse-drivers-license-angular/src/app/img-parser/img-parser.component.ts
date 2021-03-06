import { Component, OnInit } from '@angular/core';
import {BarcodeReader, EnumBarcodeFormat} from 'dynamsoft-javascript-barcode';
import { CodeParser, EnumCodeFormat } from 'dynamsoft-code-parser';

@Component({
  selector: 'app-img-parser',
  templateUrl: './img-parser.component.html',
  styleUrls: ['./img-parser.component.css']
})
export class ImgParserComponent implements OnInit {
  pReader = null;
  pParser = null;

  async ngOnInit(): Promise<void> {}

  decodeImg = async (e: any) => {
    try {
      const reader = await (this.pReader = this.pReader || BarcodeReader.createInstance());
      const settings = await reader.getRuntimeSettings();
      settings.barcodeFormatIds = 0;
      settings.barcodeFormatIds_2 = 0;
      settings.barcodeFormatIds |= EnumBarcodeFormat.BF_PDF417;
      settings.barcodeFormatIds |= EnumBarcodeFormat.BF_QR_CODE;
      await reader.updateRuntimeSettings(settings);

      const parser = await(this.pParser = this.pParser || CodeParser.createInstance());
      await parser.setCodeFormat(EnumCodeFormat.CF_AUTO);

      const results = await reader.decode(e.target.files[0]);

      for(let i=0;i<results.length;i++) {
        const info = await parser.parseData(results[i].barcodeBytes);
        alert(JSON.stringify(info));
        console.log(info);
      }

      if(!results.length){ alert('No barcode found'); }
    } catch (ex) {
      alert(ex);
    }
    e.target.value = '';
  }

  async ngOnDestroy() {
    if (this.pReader) {
      (await this.pReader).destroyContext();
      (await this.pParser).destroyContext();
      console.log('ImgParser Component Unmount');
    }
  }
}
