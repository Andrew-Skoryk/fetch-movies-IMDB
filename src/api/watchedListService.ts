import { SupabaseTableService } from './SupabaseTableService';

const tableName = 'watched_list';

const watchedListService = new SupabaseTableService(tableName);

export default watchedListService;
