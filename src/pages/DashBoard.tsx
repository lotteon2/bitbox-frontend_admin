import React from "react";
import { Select } from 'antd';

export default function DashBoard() {
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
      };
    return <div className="mx-3">
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' }
          ]}
        />
        대시보드</div>;
}