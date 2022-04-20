const express = require('express')
const escpos = require('escpos');
const cors = require('cors');
escpos.USB = require('escpos-usb');


const app = express()
const port = 5000;
app.use(cors(
  { origin: "*" }
))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// const deviceName = escpos.USB.findPrinter()
// console.log(deviceName);



app.post('/', (req, res) => {
  const arr1 = req.body;
  console.log(arr1)

  arr1.forEach(async data => {


    (async () => {
      const device = await new escpos.USB(1208, 3624); const options = { encoding: "GB18030" /* default */ }
      const printer = await new escpos.Printer(device, options);
      (() => {
        device.open(async function (error) {
          console.log(error);
          if (true) {
            await printer
              .font('a')
              .align('lt')
              .style('bu')
              .size(0, 0)
              .text("Material:")
              .align('ct')
              .text(data.material)
              .align('lt')
              .text("Vendor:")
              .align('ct')
              .text(data.vendor)
              .align('ct')
              .size(0, 1)
              .tableCustom(
                [
                  { text: "Quantity", align: "LEFT", width: 0.33, style: 'B' },
                  { text: data.qty, align: "CENTER", width: 0.33 }
                ],
                { encoding: 'cp857', size: [1, 1] } // Optional
              )
              .tableCustom(
                [
                  { text: "Received", align: "LEFT", width: 0.33, style: 'B' },
                  { text: new Date().toISOString().slice(0, 10), align: "CENTER", width: 0.33 }
                ],
                { encoding: 'cp857', size: [1, 1] } // Optional
              )

              .align('ct')
              .size(0, 0)
              .text('Project')
              .size(1, 1)
              .text(data.project.name)
              .size(0, 1)
              .text(data.project.area)
              .tableCustom(
                [
                  { text: "Mat ID", align: "LEFT", width: 0.33, style: 'B' },
                  { text: data.project.matId, align: "CENTER", width: 0.33 }
                ],
                // { encoding: 'cp857', size: [1, 1] } // Optional
              )
              .qrimage(data.inventoryID, function (err) {

                printer.cut()
                printer.close()

              });

          } else {

            await printer
              .font('a')
              .align('lt')
              .style('bu')
              .size(0, 0)
              .text("Material:")
              .align('ct')
              .text(data.material)
              .align('lt')
              .text("Vendor:")
              .align('ct')
              .text(data.vendor)
              .align('ct')
              .size(0, 1)
              .tableCustom(
                [
                  { text: "Quantity", align: "LEFT", width: 0.33, style: 'B' },
                  { text: data.qty, align: "CENTER", width: 0.33 }
                ],
                { encoding: 'cp857', size: [1, 1] } // Optional
              )
              .tableCustom(
                [
                  { text: "Received", align: "LEFT", width: 0.33, style: 'B' },
                  { text: new Date().toISOString().slice(0, 10), align: "CENTER", width: 0.33 }
                ],
                { encoding: 'cp857', size: [1, 1] } // Optional
              )
              .tableCustom(
                [
                  { text: "Mat ID", align: "LEFT", width: 0.33, style: 'B' },
                  { text: data.project.matId, align: "CENTER", width: 0.33 }
                ],
                // { encoding: 'cp857', size: [1, 1] } // Optional
              )
              .qrimage(data.inventoryID, function (err) {

                // this.close();
                // this.close();
                // resolve()
                printer.cut()
                printer.close()
              });




          }
        });


      })()
      device.open(async function (error) {

        // await printJob(alldata)

      })
    })();
  });
  res.send("he")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




