import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

type StatisticOfDay = {
  pv: number;
  uv: number;
  pspv: number;
  psuv: number;
};

@Entity()
export class LogRecord {
  static fromIp(ip: string, isPoster: boolean) {
    const logRecord = new LogRecord();

    logRecord.ip = ip;
    logRecord.isPoster = isPoster;

    return logRecord;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @Column()
  isPoster: boolean;

  @Column({ type: 'timestamp' })
  timeStamp: Date;
}

@Entity()
export class Archive {
  static statisticArchives(
    archives: Archive[],
  ): Record<string, StatisticOfDay> {
    const statistics = archives.reduce((s, a) => {
      const dateTime = new Date(a.date).setHours(0, 0, 0, 0);
      const prevData = s[dateTime] || {
        pv: 0,
        uv: 0,
        pspv: 0,
        psuv: 0,
      };
      s[dateTime] = {
        pv: prevData.pv + a.pv,
        uv: prevData.uv + a.uv,
        pspv: prevData.pspv + a.pspv,
        psuv: prevData.psuv + a.psuv,
      };

      return s;
    }, {} as Record<string, StatisticOfDay>);

    return statistics;
  }
  static statisticRecords(records: LogRecord[]): StatisticOfDay {
    const nonPosterRecords = records.filter((r) => !r.isPoster);
    const pv = nonPosterRecords.length;
    const uv = new Set(...nonPosterRecords.map((r) => r.ip)).size;
    const posterRecords = records.filter((r) => r.isPoster);
    const pspv = posterRecords.length;
    const psuv = new Set(...posterRecords.map((r) => r.ip)).size;

    return {
      pv,
      uv,
      pspv,
      psuv,
    };
  }

  static fromRecords(records: LogRecord[]) {
    const archive = new Archive();
    const { pv, uv, pspv, psuv } = Archive.statisticRecords(records);

    archive.pv = pv;
    archive.uv = uv;
    archive.pspv = pspv;
    archive.psuv = psuv;

    return archive;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column()
  pv: number;

  @Column()
  uv: number;

  @Column()
  pspv: number;

  @Column()
  psuv: number;
}
