const express = require('express')
const escpos = require('escpos');
escpos.USB = require('escpos-usb');
const device  = new escpos.USB();

const options = { encoding: "GB18030" /* default */ }
const printer = new escpos.Printer(device, options);

const app = express()
const port = 5000;

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

app.post('/', (req, res) => {
    const data = req.body;
    console.log(data)

    device.open(function(error){
        printer
        .font('a')
        .align('ct')
        .style('bu')
        .size(1, 1)
        .text('The quick brown fox jumps over the lazy dog')
        .text('Prueba')
        .barcode('1234567', 'EAN8')
        .table(["One", "Two", "Three"])
        .tableCustom(
          [
            { text:"Left", align:"LEFT", width:0.33, style: 'B' },
            { text:"Center", align:"CENTER", width:0.33},
            { text:"Right", align:"RIGHT", width:0.33 }
          ],
          { encoding: 'cp857', size: [1, 1] } // Optional
        )
        .qrimage('https://github.com/song940/node-escpos', function(err){
          this.cut();
          this.close();
        });
      });

  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})