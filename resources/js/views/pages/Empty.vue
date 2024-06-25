<template>
    <div className="card">
        <h5>Empty Page</h5>
        <p>Use this page to start from scratch and place your custom content.</p>
        <div class="field">
            <DataTable
                v-model:sortField="sortBy"
                v-model:rows="rows"
                v-model:sortOrder="sortOrder"
                v-model:totalRecords="totalRecords"
                @page="fetch"
                :loading="loading"
                :value="list"
                :scrollable="true"
                :rowsPerPageOptions="[10, 20, 50, 100]"
                :lazy="true"
                :paginator="true"
                paginatorTemplate=" FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                showGridlines
                tableStyle="min-width: 20rem"
                scrollDirection="both"
            >
                <Column field="code" header="Code" class="grid-table-line"></Column>
                <Column field="description" header="Description" style="width: 500px"></Column>
                <Column field="status" header="Status" class="grid-table-line"></Column>
                <Column field="created_at" header="Created At" class="grid-table-line" v-if="can_show_date"></Column>
                <Column field="updated_at" header="Updated At" class="grid-table-line" v-if="can_show_date"></Column>
                <Column field="deleted_at" header="Deleted At" class="grid-table-line" v-if="can_show_date && can_restore"></Column>
                <Column field="created_by.emp_id" header="Created By" class="grid-table-line" v-if="can_show_user"></Column>
                <Column field="updated_by.emp_id" header="Updated By" class="grid-table-line" v-if="can_show_user"></Column>
                <Column field="actions" header="Actions" frozen alignFrozen="right" class="grid-table-line col-1">
                    <template #body="data">
                        <Button :disabled="!can_edit" v-if="data.data.deleted_at == null" v-tooltip.top="'Edit'" icon="pi pi-pencil" class="p-button-text p-button-plain p-0" @click="edit(data)"></Button>
                        <Button :disabled="!can_edit" v-if="data.data.deleted_at == null" v-tooltip.top="'Change Status'" severity="success" icon="pi pi-sync" class="p-button-text p-button-plain p-0" @click="deactive(data)"></Button>
                        <Button :disabled="!can_delete" v-if="data.data.deleted_at == null" v-tooltip.top="'Delete'" severity="danger" icon="pi pi-times" class="p-button-text p-button-plain p-0" @click="destroy(data)"></Button>
                        <Button :disabled="!can_restore" v-if="data.data.deleted_at != null" v-tooltip.top="'Restore'" severity="info" icon="pi pi-history" class="p-button-text p-button-plain p-0" @click="destroy(data)"></Button>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
