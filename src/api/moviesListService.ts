import { SupabaseTableService } from './SupabaseTableService';

const tableName = 'watch_list';

const moviesListService = new SupabaseTableService(tableName);

export default moviesListService;
