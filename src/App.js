import { Button, Form, Input, Space, QRCode } from "antd";
import { useRef, useState } from "react";

function App() {
  const [form] = Form.useForm();
  const [qrValues, setQRValues] = useState("");
  const qrCodeRef = useRef(null);

  const onFinish = (values) => {
    setQRValues(values.url);
  };

  const handleDownload = () => {
    const canvas = qrCodeRef.current.querySelector("canvas");
    const downloadLink = document.createElement("a");
    downloadLink.download = "qrcode.png";
    downloadLink.href = canvas.toDataURL("image/png");
    downloadLink.click();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-[500px] mt-[120px] shadow-md px-[40px] py-[20px] rounded-3xl bg-white">
        <h2 className="uppercase text-[32px] font-semibold mb-[20px] text-center font-sans">
          Tạo QR Code tự động
        </h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          className="w-full"
        >
          <Form.Item
            name="url"
            label="URL"
            rules={[
              { required: true },
              { type: "url", warningOnly: true },
              { type: "string", min: 6 },
            ]}
          >
            <Input placeholder="Nhập URL của bạn!" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Generator QRCode
              </Button>
            </Space>
          </Form.Item>
          {qrValues && (
            <div
              ref={qrCodeRef}
              className="flex flex-col items-center mt-[30px]"
            >
              <h4>Mã QR Code của bạn</h4>
              <QRCode
                value={qrValues}
                errorLevel="H"
                icon="wow-brand.png"
                className="mb-[20px]"
              />
              <Button onClick={handleDownload}>Download QR Code</Button>
            </div>
          )}
        </Form>
        <p className="text-[10px] font-sans italic text-right">make by Ethan</p>
      </div>
    </div>
  );
}

export default App;
