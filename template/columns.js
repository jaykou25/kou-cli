module.exports = genColumns = (cols = []) => {
  const renderCols = () => {
    if (cols.length) {
      return cols
        .map(
          (col) => `
    { title: '${col.title}', dataIndex: '${col.dataIndex}' }`
        )
        .join(",");
    } else {
      return `
    {
      title: '名字',
      dataIndex: 'name',
      width: 80,
    }`;
    }
  };
  return `import LinkButton from '@/components/LinkButton';
import type { ProColumnProps } from '@/interface';
import { handleValuesForEdit } from '@/utils/form';

export const getColumns = (options?: any): ProColumnProps[] => {
  const { setState } = options || {};
  const cols: ProColumnProps[] = [
    { title: '序号', valueType: 'index', width: 60 },${renderCols()},
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      fixed: 'right',
      ellipsis: true,
      renderOption: (text, record) => [
        <LinkButton
          key={1}
          onClick={() =>
            setState({
              formVisible: true,
              formType: 'edit',
              formData: handleValuesForEdit(record, getColumns()),
            })
          }
        >
          编辑
        </LinkButton>,
      ],
    },
  ];

  return cols.map((col) => {
    const $col = { ...col };

    if (!col.width) $col.width = 100;

    if (col.hideInSearch === undefined) $col.hideInSearch = true;

    if (col.ellipsis === undefined) $col.ellipsis = true;

    if (!col.formItemProps) {
      $col.formItemProps = { rules: [{ required: true }] };
    }

    return $col;
  });
}; 

  `;
};
