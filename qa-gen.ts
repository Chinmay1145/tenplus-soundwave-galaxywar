import { jsPDF } from "jspdf";
const proto:any = (jsPDF as any).API;
proto.save = function(name:string){ const fs=require("fs"); fs.writeFileSync("/tmp/qa/"+name, Buffer.from(this.output("arraybuffer"))); return this; };
const { downloadInvoice } = await import("./src/lib/invoice.ts");
const { downloadReportPDF, buildSummary } = await import("./src/lib/reports.ts");
downloadInvoice({ id:"a1b2c3d4-1111-2222-3333-444455556666", createdAt:new Date().toISOString(), total:45998, subtotal:38982, tax:7016, shipping:0, status:"shipped", paymentMethod:"UPI", items:[{name:"Aurora Pro True Wireless Earbuds",qty:2,price:14999},{name:"PULSE Reference Studio Over-Ear Headphones",qty:1,price:8984}], customer:{name:"Aarav Sharma",email:"aarav@example.com"}, shippingAddress:{name:"Aarav Sharma",line1:"22 MG Road",city:"Bengaluru",state:"KA",pincode:"560001",phone:"9876543210"} } as any);
const orders=[{id:"o1",total:45998,status:"delivered",created_at:new Date().toISOString(),items:[{name:"Aurora Pro",qty:2,price:14999}]}];
const s=buildSummary(orders as any,[],new Date(Date.now()-90*864e5),new Date(),"week");
downloadReportPDF(s,"Aarav Sharma");
