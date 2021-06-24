import { Form, Input, Button } from "antd";
import { useForm } from "react-hook-form";
import { Row, Col } from "antd";


export default function Home(){
    const {
		register,
		handleSubmit,
	} = useForm();
    const onSubmit = data => console.log(data);

  return (
		<Row justify="space-around" align="middle">
			<Col span={4}>
				<Form name="basic" onFinish={handleSubmit(onSubmit)}>
					<Form.Item
						span={12}
						label="Token"
						name="token"
						rules={[
							{
								required: true,
								message: "Please input user Token!",
							},
						]}
					>
						<Input {...register("token")} />
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Col>
		</Row>
  );
};