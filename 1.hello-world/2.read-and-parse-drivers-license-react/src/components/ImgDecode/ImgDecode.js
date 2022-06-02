import React, { Component } from 'react'
import { BarcodeReader, EnumBarcodeFormat } from "dynamsoft-javascript-barcode";
import { CodeParser, EnumCodeFormat } from 'shen-dynamsoft-code-parser';
import './ImgDecode.css'

export default class ImgDecode extends Component {
  constructor(props) {
    super(props);
    this.pReader = null;
    this.pParser = null;
  }

  decodeImg = async (e) => {
    try {
      const reader = await (this.pReader = this.pReader || BarcodeReader.createInstance());
      const settings = await reader.getRuntimeSettings();
      settings.barcodeFormatIds = EnumBarcodeFormat.BF_PDF417;
      await reader.updateRuntimeSettings(settings);

      const parser = await (this.pParser = this.pParser || CodeParser.createInstance());
      await parser.setCodeFormat(EnumCodeFormat.CF_AUTO);

      let results = await reader.decode(e.target.files[0]);

      for(let i=0;i<results.length;i++) {
        const info = await parser.parseData(results[i].barcodeBytes);
        alert(JSON.stringify(info));
        console.log(info);
      }

      if(!results.length){ alert('No barcode found'); }
    } catch(ex) {
      alert(ex);
    }
    e.target.value = '';
  }

  async componentWillUnmount() {
    if (this.pReader) {
      (await this.pReader).destroyContext();
      (await this.pParser).destroyContext();
      console.log('ImgDecode Component Unmount');
    }
  }

  render() {
    return (
      <div className="ImgDecode"><input type="file" onChange={this.decodeImg}/></div>
    )
  }
}