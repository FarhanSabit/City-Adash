import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataTable = ({ data, columns, title }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig?.key) return data;

    return [...data]?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];

      if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const paginatedData = sortedData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" iconName="Download" iconSize={14}>
            Export
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              {columns?.map((column) => (
                <th
                  key={column?.key}
                  onClick={() => column?.sortable && handleSort(column?.key)}
                  className={column?.sortable ? 'cursor-pointer hover:bg-muted/50' : ''}
                >
                  <div className="flex items-center gap-2">
                    {column?.label}
                    {column?.sortable && (
                      <Icon
                        name={
                          sortConfig?.key === column?.key
                            ? sortConfig?.direction === 'asc' ?'ChevronUp' :'ChevronDown' :'ChevronsUpDown'
                        }
                        size={14}
                        color="var(--color-muted-foreground)"
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((row, index) => (
              <tr key={index}>
                {columns?.map((column) => (
                  <td key={column?.key}>
                    {column?.render ? column?.render(row?.[column?.key], row) : row?.[column?.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-border flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, sortedData?.length)} of {sortedData?.length} entries
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
            iconSize={14}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded flex items-center justify-center text-sm transition-colors ${
                    currentPage === page
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconSize={14}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;