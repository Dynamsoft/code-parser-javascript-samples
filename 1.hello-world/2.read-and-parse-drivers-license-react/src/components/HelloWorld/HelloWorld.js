import './HelloWorld.css';
import reactLogo from '../../logo.svg';
import "../../dbr"; // import side effects. The license, engineResourcePath, so on.
import "../../dcp"; // import side effects. The license, engineResourcePath, so on.
import { BarcodeReader } from "dynamsoft-javascript-barcode";
import { CodeParser } from "shen-dynamsoft-code-parser";
import React from 'react';
import VideoParser from '../VideoParser/VideoParser';
import ImgParser from '../ImgParser/ImgParser';

class HelloWorld extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bShowScanner: true,
            bShowImgDecode: false
        };
    }
    async componentDidMount() {
        try {
            await BarcodeReader.loadWasm();
            await CodeParser.loadWasm();
        } catch (ex) {
            alert(ex);
            throw ex;
        }
    }

    showScanner = () => {
        this.setState({
            bShowScanner: true,
            bShowImgDecode: false
        });
    }

    showImgDecode = () => {
        this.setState({
            bShowScanner: false,
            bShowImgDecode: true
        });
    }
    
    render() {
        return (
            <div className="helloWorld">
                <h1>Hello World for React<img src={reactLogo} className="App-logo" alt="logo" /></h1>
                <div className="btn-group">
                    <button style={{marginRight: '10px', backgroundColor: this.state.bShowScanner ? 'rgb(255,174,55)' : 'white'}} onClick={this.showScanner}>Video Decode</button>
                    <button style={{backgroundColor: this.state.bShowImgDecode ? 'rgb(255,174,55)' : 'white'}} onClick={this.showImgDecode}>Image Decode</button>
                </div>
                <div className="container">
                    {this.state.bShowScanner ? (<VideoParser></VideoParser>) : ""}
                    {this.state.bShowImgDecode ? (<ImgParser></ImgParser>) : ""}
                </div>
            </div>
        );
    }
}
export default HelloWorld;