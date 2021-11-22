module.exports = component = (name) =>
  `import ProTablePlus from '@/components/ProTablePlus';
import { queryProjects } from '@/services/projects';
import { handleRequestParams } from '@/utils';
import { BREAD } from '@/utils/constants';
import { PageContainer } from '@ant-design/pro-layout';
import { getColumns } from './columns';

function ${name}() {
  return (
    <PageContainer breadcrumbRender={BREAD}>
      <ProTablePlus
        name="项目"
        request={(params, sort) => queryProjects(handleRequestParams(params, sort))}
        columns={getColumns()}
        rowSelection={{}}
        withModal={false}
      />
    </PageContainer>
  );
}

export default ${name};
`;
