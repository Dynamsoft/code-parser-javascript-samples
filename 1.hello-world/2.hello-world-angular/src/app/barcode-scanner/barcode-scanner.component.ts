import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, EnumBarcodeFormat } from 'dynamsoft-javascript-barcode'
import { CodeParser, EnumCodeFormat } from 'shen-dynamsoft-code-parser'
@Component({
  selector: 'app-video-decode',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css']
})
export class VideoDecodeComponent implements OnInit {
  pScanner = null;
  pParser = null;

  async ngOnInit(): Promise<void> {
    try {
      const scanner = await (this.pScanner = BarcodeScanner.createInstance());
      const settings = await scanner.getRuntimeSettings();
      settings.barcodeFormatIds = EnumBarcodeFormat.BF_PDF417;
      await scanner.updateRuntimeSettings(settings);
      await scanner.setUIElement((document.querySelector('.component-barcode-scanner') as any));

      const parser = await (this.pParser = CodeParser.createInstance());
      parser.setCodeFormat(EnumCodeFormat.CF_DL_AAMVA_ANSI);

      /* scanner.onFrameRead = (results: any) => {
        for (const result of results) {
          console.log(result);
        }
      }; */

      scanner.onUniqueRead = async (txt: string, result: any) => {
        const info = await parser.parseData(result.barcodeBytes);
        alert(JSON.stringify(info));
        console.log(info);
      };
      await scanner.open();
    } catch (ex) {
      alert(ex);
    }
  }
  async ngOnDestroy() {
    if (this.pScanner) {
      (await this.pScanner).destroyContext();
      (await this.pParser).destroyContext();
      console.log('BarcodeScanner Component Unmount');
    }
  }
}
