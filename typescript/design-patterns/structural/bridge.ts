
// Bridge - Structural Design Pattern

interface MediaPlayerImplementation {
    playAudio(): void;
    playVideo(): void;
}

class WindowsMediaPlayer implements MediaPlayerImplementation {
    public playAudio(): void {
        console.log(`Playing audio on windows media player`);
    }
    public playVideo(): void {
        console.log(`Playing video on windows media player`);
    }
}

class MacOsMediaPlayer implements MediaPlayerImplementation {
    public playAudio(): void {
        console.log(`Playing audio on MacOS media player`);
    }
    public playVideo(): void {
        console.log(`Playing video on MacOS media player`);
    }
}

abstract class MediaPlayerAbstraction {
    constructor(
        protected implementation: MediaPlayerImplementation,
    ) {}

    abstract playFile(): void;
}

class AudioPlayer extends MediaPlayerAbstraction {
    public playFile(): void {
        this.implementation.playAudio();
    }
}

class VideoPlayer extends MediaPlayerAbstraction {
    public playFile(): void {
        this.implementation.playVideo();
    }
}

// Client code
const windowsAudioPlayer = new AudioPlayer(new WindowsMediaPlayer());
const macOsVideoPlayer = new VideoPlayer(new MacOsMediaPlayer());

windowsAudioPlayer.playFile();
macOsVideoPlayer.playFile();

// Real World Implementation

interface Database {
    close(): void;
    connect(): void;
    query(query: string): void;
}

class PostgresSQLDatabase implements Database {
    connect(): void {
        console.log(`Connecting to PostgreSQL`);
    }

    public query(query: string): void {
        console.log(`Executing query:: ${query}`);
    }

    public close(): void {
        console.log(`Closing connection Postgrsql`);
    }
}

class MongoDBDatabase implements Database {
    connect(): void {
        console.log(`Connecting to MongoDB`);
    }

    public query(query: string): void {
        console.log(`Executing query:: ${query}`);
    }

    public close(): void {
        console.log(`Closing connection MongoDB`);
    }
}

abstract class DatabaseService {
    constructor(
        protected database: Database,
    ) {}
    abstract fetchData(query: string): void;
}

class ClientDatabaseService extends DatabaseService {
    fetchData(query: string): void {
        this.database.connect();
        this.database.query( query );
        this.database.close();
    }
}

const mongoDbService = new ClientDatabaseService( new MongoDBDatabase() );
const postgresService = new ClientDatabaseService( new PostgresSQLDatabase() );

mongoDbService.fetchData("SELECT * FROM Users");
postgresService.fetchData("SELECT * FROM Users;");

