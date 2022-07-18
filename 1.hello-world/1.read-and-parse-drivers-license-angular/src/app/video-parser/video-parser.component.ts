import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, EnumBarcodeFormat } from 'dynamsoft-javascript-barcode'
import { CodeParser, EnumCodeFormat } from 'dynamsoft-code-parser'
@Component({
  selector: 'app-video-parser',
  templateUrl: './video-parser.component.html',
  styleUrls: ['./video-parser.component.css']
})
export class VideoParserComponent implements OnInit {
  pScanner = null;
  pParser = null;

  async ngOnInit(): Promise<void> {
    try {
      const scanner = await (this.pScanner = BarcodeScanner.createInstance());
      const settings = await scanner.getRuntimeSettings();
      settings.barcodeFormatIds = 0;
      settings.barcodeFormatIds_2 = 0;
      settings.barcodeFormatIds |= EnumBarcodeFormat.BF_PDF417;
      settings.barcodeFormatIds |= EnumBarcodeFormat.BF_QR_CODE;
      settings.deblurLevel = 7;
      await scanner.updateRuntimeSettings(settings);
      await scanner.setUIElement((document.querySelector('.component-video-parser') as any));

      const parser = await (this.pParser = CodeParser.createInstance());
      parser.setCodeFormat(EnumCodeFormat.CF_AUTO);

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
      console.log('VideoParser Component Unmount');
    }
  }
}
