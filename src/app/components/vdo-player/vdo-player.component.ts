import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-vdo-player',
  templateUrl: './vdo-player.component.html',
  styleUrls: ['./vdo-player.component.css']
})
export class VdoPlayerComponent implements OnInit {
  playlist = [
    {
      title: 'Agent 327!',
      src: 'https://media.vimejs.com/720p.mp4',
      type: 'video/mp4'
    },
    {
      title: 'Big Buck Bunny',
      src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
      type: 'video/mp4'
    },
    {
      title: 'Messi Goal',
      src: 'http://static.videogular.com/assets/videos/goal-2.mp4',
      type: 'video/mp4'
    }
  ];
  currentIndex = 0;
  activeVideo = this.playlist[this.currentIndex];
  api!: { getDefaultMedia: () => { (): any; new(): any; subscriptions: { (): any; new(): any; loadedMetadata: { (): any; new(): any; subscribe: { (arg0: () => void): void; new(): any; }; }; ended: { (): any; new(): any; subscribe: { (arg0: () => void): void; new(): any; }; }; }; }; play: () => void; };

  constructor() {
  }
  ngOnInit() {
    
  }
  onPlayerSet(api: any) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.startVideo.bind(this));
    this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }
  nextVideo() {
    this.currentIndex++;
    if (this.currentIndex === this.playlist.length) {
      this.currentIndex = 0;
    }
    this.activeVideo = this.playlist[this.currentIndex];
  }
  startVideo() {
    this.api.play();
  }
  onClickPlaylistVideo(item: { title: string; src: string; type: string; }, index: number) {
    this.currentIndex = index;
    this.activeVideo = item;
  }
}