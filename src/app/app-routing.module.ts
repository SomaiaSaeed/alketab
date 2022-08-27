import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {path: 'root', loadChildren: () => import('./root/root/root.module').then(m => m.RootModule)},
  {path: 'motsahbh', loadChildren: () => import('./motashabh/motashabh/motashabh.module').then(m => m.MotashabhModule)},
  {path: 'home', loadChildren: () => import('./home/home/home.module').then(m => m.HomeModule)},
  {path: 'footer', loadChildren: () => import('./footer/footer/footer.module').then(m => m.FooterModule)},
  {path: 'readers', loadChildren: () => import('./readers/readers/readers.module').then(m => m.ReadersModule)},
  {path: 'qoraa', loadChildren: () => import('./qoraa/qoraa/qoraa.module').then(m => m.QoraaModule)},
  {path: '', loadChildren: () => import('./navbar/navbar/navbar.module').then(m => m.NavbarModule)},
  {
    path: 'search',
    loadChildren: () => import('./search-settings/search.module').then(m => m.SearchSettingsModule)
  },
  {path: 'listen', loadChildren: () => import('./listen-setting/listen/listen.module').then(m => m.ListenModule)},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
