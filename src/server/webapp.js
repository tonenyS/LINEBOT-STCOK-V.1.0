const { render } = require('../functions/utils');
const {
  replyMessage,
  sendLineNotify,
  getUserProfile,
  MESSAGE_TYPE,
} = require('../functions/LineBot');

const Route = {};
Route.path = function (routeName, callback) {
  Route[routeName] = callback;
};

function loadUi() {
  return render('index', {
    title: '- 🕵️‍♀️ Project List -',
  });
}

async function totalStock(sourceObj) {
  let productList = '';
  Logger.log('[totalStock()] : starting function.');
  try {
    Logger.log(`[fmBuildingCondoName()] source: ${JSON.stringify(sourceObj)}`);
    try {
      const userProfile = await getUserProfile(sourceObj.source.userId, sourceObj.source.groupId);
      Logger.log(`[sendLineNotify()] user information.${userProfile}`);
      await sendLineNotify(
        `ได้รับคำสั่งจากคุณ ${
          userProfile.displayName !== '' ? userProfile.displayName : 'ไม่ทราบชื่อ'
        } แล้วค่ะ`
      );
    } catch (error) {
      Logger.log('[sendLineNotify()] fails.');
    }
    const store = SpreadsheetApp.getActive().getSheetByName('Summary'); // เชื่อมsheet
    const document = store.getRange('J231:L231').getValues(); // ดึงส่วนที่จะดึง
    await document.forEach((row, index) => {
      if (index !== document.length) productList += '\n';
      productList += ` Total :${row[0]}\n Total QT : ${row[1]}\n Total CW : ${row[2]}\n `;
    });
    Logger.log(`[totalStock()] : Model ${JSON.stringify(productList)}`);
    replyMessage(
      sourceObj.replyToken,
      ` BOT ทำการส่งข้อมูลมาให้แล้วค่ะ  ${productList}`,
      MESSAGE_TYPE.NORMAL
    );
  } catch (error) {
    Logger.log(`[totalStock)] : error.${error}`);
  }
}

// <<-----------------การทำงาน--------------------->>>
async function fmStockFiberNet(replyToken) {
  // ฟังชั่นรับ replytoken
  let productList = '';
  Logger.log('[fmStockFnStall()] : starting function.');
  try {
    const store = SpreadsheetApp.getActive().getSheetByName('Summary'); // เชื่อมsheet
    const document = store.getRange('B180:L182').getValues(); // ดึงส่วนที่จะดึง
    await document.forEach((row, index) => {
      if (index !== document.length) productList += '\n';
      productList += `${row[0]}\n -MinStock :${row[4]}\n -MinCW : ${row[5]}\n -MinQT : ${row[6]}\n -Total Stock : ${row[8]}\n -Changwattana : ${row[9]}\n -Quintus : ${row[10]}\n`;
    });
    Logger.log(`[fmStockFnStall()] : Model ${JSON.stringify(productList)}`);
    replyMessage(
      replyToken,
      ` BOT ทำการส่งข้อมูลมาให้แล้วค่ะ  ${productList}`,
      MESSAGE_TYPE.NORMAL
    );
  } catch (error) {
    Logger.log(`[fmStockFnStall)] : error.${error}`);
  }
}

async function fmStock3bb(replyToken) {
  // ฟังชั่นรับ replytoken
  let productList = '';
  Logger.log('[fmStockFnStall()] : starting function.');
  try {
    const store = SpreadsheetApp.getActive().getSheetByName('Summary'); // เชื่อมsheet
    const document = store.getRange('B185:L185').getValues(); // ดึงส่วนที่จะดึง
    await document.forEach((row, index) => {
      if (index !== document.length - 1) {
        if (document !== '') productList += '\n';
      }
      productList += `${row[0]}\n -MinStock :${row[4]}\n -MinCW : ${row[5]}\n -MinQT : ${row[6]}\n -Total Stock : ${row[8]}\n -Changwattana : ${row[9]}\n -Quintus : ${row[10]}`;
    });
    Logger.log(`[fmStockFnStall()] : Model ${JSON.stringify(productList)}`);
    replyMessage(
      replyToken,
      ` BOT ทำการส่งข้อมูลมาให้แล้วค่ะ\n ${productList}`,
      MESSAGE_TYPE.NORMAL
    );
  } catch (error) {
    Logger.log(`[fmStockFnStall)] : error.${error}`);
  }
}

async function fmStockAis(replyToken) {
  // ฟังชั่นรับ replytoken
  let productList = '';
  Logger.log('[fmStockFnStall()] : starting function.');
  try {
    const store = SpreadsheetApp.getActive().getSheetByName('Summary'); // เชื่อมsheet
    const document = store.getRange('B187:L208').getValues(); // ดึงส่วนที่จะดึง
    await document.forEach((row, index) => {
      if (index !== document.length) {
        if (document !== '') productList += '\n';
      }
      productList += `${row[0]}\n -MinStock :${row[4]}\n -MinCW : ${row[5]}\n -MinQT : ${row[6]}\n -Total Stock : ${row[8]}\n -Changwattana : ${row[9]}\n -Quintus : ${row[10]}\n`;
    });
    Logger.log(`[fmStockFnStall()] : Model ${JSON.stringify(productList)}`);
    replyMessage(replyToken, ` BOT ทำการส่งข้อมูลมาให้แล้วค่ะ ${productList}`, MESSAGE_TYPE.NORMAL);
  } catch (error) {
    Logger.log(`[fmStockFnStall)] : error.${error}`);
  }
}

async function fmStockTrue(replyToken) {
  // ฟังชั่นรับ replytoken
  let productList = '';
  Logger.log('[fmStockFnStall()] : starting function.');
  try {
    const store = SpreadsheetApp.getActive().getSheetByName('Summary'); // เชื่อมsheet
    const document = store.getRange('B212:L226').getValues(); // ดึงส่วนที่จะดึง
    await document.forEach((row, index) => {
      if (index !== document.length) {
        if (document !== '') productList += '\n';
      }
      productList += `${row[0]}\n -MinStock :${row[4]}\n -MinCW : ${row[5]}\n -MinQT : ${row[6]}\n -Total Stock : ${row[8]}\n -Changwattana : ${row[9]}\n -Quintus : ${row[10]}\n`;
    });
    Logger.log(`[fmStockFnStall()] : Model ${JSON.stringify(productList)}`);
    replyMessage(replyToken, ` BOT ทำการส่งข้อมูลมาให้แล้วค่ะ ${productList}`, MESSAGE_TYPE.NORMAL);
  } catch (error) {
    Logger.log(`[fmStockFnStall)] : error.${error}`);
  }
}

function cmdTerraUpdate(sourceObj) {
  Logger.log('[cmdfmstockUpdate()] : starting function.');
  replyMessage(sourceObj.replyToken, 'กำลังทำการอัพเดตสต็อคให้ค่ะ.', MESSAGE_TYPE.NORMAL);
  global.calSummary(sourceObj);
}

async function findCriticalProducts() {
  let productList = '';
  const store = SpreadsheetApp.getActive().getSheetByName('Summary');
  const document = store.getRange(`B4:Q${store.getLastRow()}`).getValues();

  await document.forEach((row, index) => {
    if (Number(row[8]) < Number(row[4]) && String(row[0]).trim() !== '') {
      if (index !== document.length - 1) productList += '\n';
      productList += row[0];
    }
  });

  return productList;
}

async function cmdTerraCritical(replyToken) {
  Logger.log('[cmdTerraCritical()] : starting function.');
  const productList = await findCriticalProducts();
  Logger.log(`[cmdTerraCritical()] : Model ${JSON.stringify(productList)}`);
  replyMessage(
    replyToken,
    ` botStock กำลังทำการเช็คจำนวนคงเหลือที่คลังแล้วค่ะ \n รายการอุปกรณ์ที่กำลังวิกฤต มีดังต่อไปนี้. ${productList}`,
    MESSAGE_TYPE.NORMAL
  );
}

function introduceBot(replyToken) {
  const items = [
    {
      type: 'action', // ③
      imageUrl:
        'https://drive.google.com/u/0/uc?id=1Esh6B3nTrV6l_tX0M5FzVRg8qXfRYIfp&export=download',
      action: {
        type: 'message',
        label: 'อัพเดตสต็อค',
        text: 'fmstock update',
      },
    },
    {
      type: 'action',
      imageUrl:
        'https://drive.google.com/u/0/uc?id=13IybdWJ7aKNxKMbDZX2Kbt7O6hnuxAXT&export=download',
      action: {
        type: 'message',
        label: 'ดูสินค้าที่มีจำนวนวิกฤต',
        text: 'fmstock critical',
      },
    },
  ];
  replyMessage(
    replyToken,
    '🙇‍♀️👩‍💻 ต้องการให้ botStock ช่วยเหลืองานไหนเลือกคำสั่งด้านล่างได้เลยค่ะ .',
    MESSAGE_TYPE.QUICKREPLY,
    items
  );
}

const doPost = (e) => {
  const fmCommandRegex = new RegExp(
    /^(\bFM[\s]*?Stock\b)[\s]*([ก-๏a-zA-Z 0-9$&+,:;=?@#|_'<>.^*()%!-/\\/]+)/i
  );
  Logger.log('[doPost()] : starting function.');
  const data = JSON.parse(e.postData.contents);
  Logger.log(`[doPost()] after starting function: ${JSON.stringify(data)}`);

  const lineTextdatas = data.events[0].message.text;
  Logger.log(`[doPost()] extract body data: ${lineTextdatas}`);

  const messages = data.events[0].message.text;
  Logger.log(`[doPost()] messages: ${messages}`);

  if (fmCommandRegex.test(messages.trim())) {
    Logger.log(`[doPost()] fmCommandRegex.text : ${fmCommandRegex.test(messages.trim())}`);
    Logger.log(`[doPost()] fmCommandRegex ${messages.trim().match(fmCommandRegex)}`);
    switch (messages.trim().match(fmCommandRegex)[2].toLowerCase()) {
      case 'search':
        Logger.log(`[doPost()] List:`);
        replyMessage(
          data.events[0].replyToken,
          'https://script.google.com/macros/s/AKfycbwy2a9sLjGIIKLqMqZKgqQvEmnc5ImcAszCBBXzmw/exec?v=project-list',
          MESSAGE_TYPE.NORMAL
        );
        break;
      case 'update':
        Logger.log('[doPost()] : switch case [update] it working.');
        cmdTerraUpdate(data.events[0]);
        break;
      case 'critical':
        Logger.log('[doPost()] : switch case [critical] it working.');
        cmdTerraCritical(data.events[0].replyToken);
        break;
      case 'onv fn':
        Logger.log('[doPost()] : switch case [fn] it working.');
        fmStockFiberNet(data.events[0].replyToken);
        break;
      case 'onv ais':
        Logger.log('[doPost()] : switch case [ais] it working.');
        fmStockAis(data.events[0].replyToken);
        break;
      case 'onv 3bb':
        Logger.log('[doPost()] : switch case [3bb] it working.');
        fmStock3bb(data.events[0].replyToken);
        break;
      case 'onv true':
        Logger.log('[doPost()] : switch case [true] it working.');
        fmStockTrue(data.events[0].replyToken);
        break;
      case 'total':
        Logger.log('[doPost()] : switch case [true] it working.');
        totalStock(data.events[0]);
        break;
      default:
        Logger.log('[doPost()] : switch case [default] it working.');
        break;
    }
  } else if (lineTextdatas.toLowerCase().indexOf('fmstock') !== -1) {
    Logger.log('[doPost()] : indexOf terra word it working.');
    introduceBot(data.events[0].replyToken);
  }

  return ContentService.createTextOutput(
    JSON.stringify({
      status: 'ok',
    })
  ).setMimeType(ContentService.JSON);
};

const doGet = (e) => {
  Route.path('project-list', loadUi);
  if (Route[e.parameters.v]) {
    return Route[e.parameters.v]();
  }
  return render('404');
};

module.exports = {
  doGet,
  doPost,
};
