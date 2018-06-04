// lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ records: [] })
  .write()

// date-time
const dateTime = require('date-time');

const { Cap, decoders } = require('cap');
const PROTOCOL = decoders.PROTOCOL;

const c = new Cap();
const device = Cap.findDevice(getIP());
const filter = 'tcp and dst port 80';
const bufSize = 10 * 1024 * 1024;
const buffer = Buffer.alloc(65535);

const linkType = c.open(device, filter, bufSize, buffer);

c.setMinBytes && c.setMinBytes(0);

c.on('packet', function (nbytes, trunc) {
  if (linkType === 'ETHERNET') {
    let ret = decoders.Ethernet(buffer);

    if (ret.info.type === PROTOCOL.ETHERNET.IPV4) {
      ret = decoders.IPV4(buffer, ret.offset);
      let DstIP = ret.info.dstaddr;
      if (ret.info.protocol === PROTOCOL.IP.TCP) {
        let datalen = ret.info.totallen - ret.hdrlen;
        ret = decoders.TCP(buffer, ret.offset);
        datalen -= ret.hdrlen;
        let host = buffer.toString('binary', ret.offset, ret.offset + datalen).match(/(?<=Host: )(.*)/);
        if(host != null) {
          console.log(host[1]);
          db.get("records")
            .push({ "time": dateTime(), "DstIP": DstIP, "host": host[1] })
            .write();
        }
      }
    }
  }
});
// 自动获得本地IP
function getIP() {
  const os = require('os');
  let IPv4;
  for (var i = 0; i < os.networkInterfaces().en0.length; i++) {
    if (os.networkInterfaces().en0[i].family == 'IPv4') {
      IPv4 = os.networkInterfaces().en0[i].address;
    }
  }
  return IPv4;
}