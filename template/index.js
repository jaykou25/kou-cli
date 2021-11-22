module.exports = component = (name) =>
  `import ProTablePlus from '@/components/ProTablePlus';
import { addProjects, delProjects, editProject, queryProjects } from '@/services/projects';
import { handleRequestParams } from '@/utils';
import { BREAD, FORM_TYPE_MAP } from '@/utils/constants';
import { handleValuesForSubmit } from '@/utils/form';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, message } from 'antd';
import { Component, createRef } from 'react';
import { getColumns } from './columns';

class ${name} extends Component<any, any> {
  private actionRef;

  constructor(props) {
    super(props);

    this.state = {
      formType: 'new',
      formVisible: false,
      formData: {},
    };

    this.actionRef = createRef();
  }

  render() {
    const { formVisible, formType, formData } = this.state;

    return (
      <PageContainer breadcrumbRender={BREAD}>
        <ProTablePlus
          name="${name}"
          request={(params, sort) => queryProjects(handleRequestParams(params, sort))}
          columns={getColumns({ setState: (props) => this.setState(props) })}
          deleteFunction={(record, selectedIds) =>
            delProjects(record.id ? [record.id] : selectedIds)
          }
          actionRef={this.actionRef}
          rowSelection={{}}
          toolbar={{
            actions: [
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() =>
                  this.setState({
                    formVisible: true,
                    formType: 'new',
                    formData: {},
                  })
                }
              >
                新增
              </Button>,
            ],
          }}
          withModal
          visible={formVisible}
          onCancel={() => this.setState({ formVisible: false })}
          formType={formType}
          initialValues={formData}
          onFinish={async (values: any) => {
            const $values = handleValuesForSubmit(values, () => ({ id: formData.id }));
            if (formType === 'new') {
              await addProjects($values);
            }

            if (formType === 'edit') {
              editProject($values);
            }

            message.success(\`\${FORM_TYPE_MAP[formType]}成功!\`);

            if (this.actionRef.current) this.actionRef.current.reload();

            return true;
          }}
        />
      </PageContainer>
    );
  }
}

export default ${name}
`;
