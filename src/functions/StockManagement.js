var path = require('path');
const {
    getDataFromRange,
    setDataToStore,
    isEmpty
} = require("./utils.js");
const {
    sendLineNotify,
    getUserProfile
} = require("./LineBot.js");

/*- ประกาศชื่อชีทด้วยฟอร์แมต คีย์:แวลู่ เพื่อเก็บชื่อสเปรตชีทที่จะใช้ทำงานให้มีรูปแบบเป็นทางการ ตั้งชื่อตัวแปรว่า DOCUMENTS ปัจจุบันมีค่าในตัวแปรอยู่ 2 ค่าคือ QUINTUS กับ CHANGWATTANA -*/
const DOCUMENTS = {
    QUINTUS: 'Quintus',
    CHANGWATTANA: 'Changwattana'
};

/*- ฟังก์ชัน calSummary เป็นฟังก์ชันที่ไม่รับ พารามิเตอร์ ใดๆเข้ามา ฟังก์ชันนสร้างขึ้นเพื่อใช้คำนวณหาผลรวมของยอดคงเหลือในแต่ละรายการสินค้า -*/
const calSummary = async (sourceObj) => {
    Logger.log("[calSummary()] : starting function.");
    var howManyTimeUseToUpdate = 0;
    var time = new Date();
    var timeStamp = time.getTime();
    var currentRow = 4;
    var store = SpreadsheetApp.getActive().getSheetByName("Summary"); 
    var document = store.getRange("B4:Q" + store.getLastRow()).getValues();
    var storeQuintus = SpreadsheetApp.getActive().getSheetByName(DOCUMENTS.QUINTUS);
    var documentQuintus = storeQuintus.getRange("B4:C" + storeQuintus.getLastRow()).getValues();
    var storeChangwattana = SpreadsheetApp.getActive().getSheetByName(DOCUMENTS.CHANGWATTANA);
    var documentChangwattana = storeChangwattana.getRange("B4:C" + storeChangwattana.getLastRow()).getValues();

    document.forEach((row) => {
        var total = row[5] + row[6];
        store.getRange(currentRow, 6).setValue(total);
        store.getRange(currentRow, 11).setValue(sumProductInventoryByName(documentChangwattana, String(row[0]).trim()));
        store.getRange(currentRow, 12).setValue(sumProductInventoryByName(documentQuintus, String(row[0]).trim()));
        currentRow++;
    });

    var finishtime = new Date();
    howManyTimeUseToUpdate = Math.round((finishtime - time) / 1000);
    setDataToStore("B4", howManyTimeUseToUpdate); // บันทึกระยะเวลาที่ใช้อัพเดตข้อมูล
    Logger.log("[calSummary()] : set active user handle btnUpdate button by " + Session.getEffectiveUser().getEmail() + " .");
    setDataToStore("B1", Session.getEffectiveUser().getEmail()); // บุคคลที่ทำการอัพเดตข้อมูลล่าสุด
    setDataToStore("B2", new Date(timeStamp).toLocaleDateString("th-TH", "d/M/Y")); // วันที่ที่อัพเดตข้อมูลล่าสุด
    setDataToStore("B3", new Date(timeStamp).toLocaleTimeString("th-TH", "HH:MM:ss")); // เวลาที่อัพเดตข้อมูลล่าสุด
    var store = SpreadsheetApp.getActive().getSheetByName("StoreData");
    var storeLastRow = store.getLastRow();
    try {
        const userProfile = await getUserProfile(sourceObj.source.userId, sourceObj.source.groupId);
        Logger.log(`[sendLineNotify()] user information.${userProfile}`);
        await sendLineNotify(
          `ได้รับคำสั่งจากคุณ ${
            userProfile.displayName !== '' ? userProfile.displayName : 'ไม่ทราบชื่อ'
          } แล้วค่ะ`
        );
        await sendLineNotify( `ได้รับคำสั่งจากคุณ ${
            userProfile.displayName !== '' ? userProfile.displayName : 'ไม่ทราบชื่อ'
          }\nทำการอัพเดตสต็อคสินค้าเรียบร้อยแล้ว\n` + 'เริ่มต้นเมื่อ: ' + Utilities.formatDate(getDataFromRange('StoreData', 'B2'), 'GMT+7', 'd MMMM Y') + ' ' +
    new Date(getDataFromRange('StoreData', 'B3')).toLocaleTimeString('th-TH', 'HH:MM:ss') + '\n' + 'ใช้เวลา ' + getDataFromRange('StoreData', 'B4') + ' วินาที\n' +
    'บุคคลกระทำการ: ' + getDataFromRange('StoreData', 'B1'));
      } catch (error) {
        Logger.log('[sendLineNotify()] fails.');
      }
    
    store.getRange(storeLastRow + 1, 1, 1, 2).setValue([Session.getEffectiveUser().getEmail(), new Date(timeStamp).toLocaleDateString("th-TH", "d/M/Y HH:MM:ss")]);
}

/*- ฟังก์ชั่นนี้จะทำการลูปเช็คแต่ละบรรทัดว่ามีค่าเท่ากับ ชื่อสินค้าที่จะให้ sum ไหม ถ้าชื่ออันเดียวกันให้บวกรวมไปเรื่อยๆ จนถึงบรรทัดสุดท้าย และ ส่งค่า sum กลับออกไป -*/
const sumProductInventoryByName = (document, keyword) => {
    let sum = 0;

    document.forEach((row) => {
        if (String(row[0]).trim() == keyword) {
            sum = sum + Number(row[1]);
        }
    });

    return sum;
}

/*- showUpdateForm: This function non-argument requried. It's will return GUI for Command dialog.-*/
const showUpdateForm = () => {
    Logger.log("[showUpdateForm()] : starting function.");
    var template = HtmlService.createTemplateFromFile("UpdateStock.html");

    // บันทึกระยะเวลาที่ใช้อัพเดตข้อมูล
    if (!isEmpty(getDataFromRange("StoreData", "B1"))) {
        template.userEmail = getDataFromRange("StoreData", "B1");
    } else {
        template.userEmail = "ยังไม่มีผู้คนอัพเดตข้อมูล";
    }

    // ดึงวันที่ที่อัพเดตข้อมูลล่าสุด
    if (!isEmpty(getDataFromRange("StoreData", "B2"))) {
        template.lastDateUpdate = Utilities.formatDate(getDataFromRange("StoreData", "B2"), "GMT+7", "d MMMM Y");
    } else {
        template.lastDateUpdate = "ไม่พบการอัพเดตข้อมูล"
    }

    // เวลาที่อัพเดตข้อมูลล่าสุด
    if (!isEmpty(getDataFromRange("StoreData", "B3"))) {
        template.lastTimeUpdate = new Date(getDataFromRange("StoreData", "B3")).toLocaleTimeString("th-TH", "HH:MM:ss");
    } else {
        template.lastTimeUpdate = "ไม่พบการอัพเดตข้อมูล"
    }

    // บันทึกระยะเวลาที่ใช้อัพเดตข้อมูล
    if (!isEmpty(getDataFromRange("StoreData", "B4"))) {
        template.howManyTimeUseToUpdate = getDataFromRange("StoreData", "B4");
    } else {
        template.howManyTimeUseToUpdate = 0;
    }

    var html = template.evaluate();
    html.setTitle("หน้าจอพื้นที่กลุ่มคำสั่ง");
    Logger.log("[showUpdateForm()] : shown dialogbox.");
    SpreadsheetApp.getUi().showModelessDialog(html, "หน้าจอพื้นที่กลุ่มคำสั่ง");
    Logger.log("[showUpdateForm()] : load template finished.");
}

export {
    calSummary,
    showUpdateForm
};