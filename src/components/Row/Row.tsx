import React from 'react'
import { DataGrid } from '@mui/x-data-grid'

export const Row: React.FC = () => {
  return (
    <div style={{ height: 250, width: '100%' }}>
      <DataGrid
        columns={[{ field: 'name' }]}
        rows={[
          { internalId: 1, name: 'React' },
          { internalId: 2, name: 'MUI' }
        ]}
        getRowId={row => row.internalId}
      />
    </div>
  )
}
