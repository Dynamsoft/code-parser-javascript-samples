<template>
  <div class="ImgDecode"><input type="file" @change="decodeImg"/></div>
</template>

<script>
import { onBeforeUnmount, ref } from "vue";
import { BarcodeReader, EnumBarcodeFormat } from 'dynamsoft-javascript-barcode';
import { CodeParser, EnumCodeFormat } from 'dynamsoft-javascript-codeparser';

export default {
  setup() {
    const pReader = ref(null);
    const pParser = ref(null);

    const decodeImg = async (e) => {
      try {
        const reader = await (pReader.value = pReader.value || BarcodeReader.createInstance());
        const settings = await reader.getRuntimeSettings();
        settings.barcodeFormatIds = EnumBarcodeFormat.BF_PDF417;
        await reader.updateRuntimeSettings(settings);

        const parser = await (pParser.value = pParser.value || CodeParser.createInstance());
        await parser.setCodeFormat(EnumCodeFormat.CF_DL_AAMVA_ANSI);

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
    onBeforeUnmount(async () => {
      if (pReader.value) {
        (await pReader.value).destroyContext();
        (await pParser.value).destroyContext();
        console.log('ImgDecode Component Unmount');
      }
    })

    return {
      decodeImg
    }
  }
}
</script>

<style scoped>
  .ImgDecode {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 90%;
    border: 1px solid black
  }
</style>