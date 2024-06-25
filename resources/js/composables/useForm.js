import { reactive } from 'vue';
export default function useForm(fields) {
    return reactive({
        fields,
        processing: false,
        error: null,
        async submit(submitter) {
            if (this.processing) return;

            this.error = null;
            this.processing = true;

            console.log(this.processing);

            try {
                await submitter(this.fields);
            } catch (err) {
                this.error = err;
            }
            this.processing = false;
        }
    });
}
